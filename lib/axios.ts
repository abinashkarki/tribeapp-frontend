import axios from 'axios';
import { refreshAccessToken } from '@/hooks/useAuth';

const DEBUG = true;

function log(...args: any[]) {
  if (DEBUG) {
    console.log(...args);
  }
}

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      log('Request with token:', token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    log('Response error:', error.response.status, error.config.url);

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      log('Attempting to refresh token');

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshAccessToken()
          .then(newToken => {
            if (newToken) {
              log('Token refreshed successfully');
              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              processQueue(null, newToken);
              resolve(axiosInstance(originalRequest));
            } else {
              log('Failed to refresh token');
              processQueue(new Error('Failed to refresh token'), null);
              reject(error);
            }
          })
          .catch(refreshError => {
            log('Error during token refresh:', refreshError);
            processQueue(refreshError, null);
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
