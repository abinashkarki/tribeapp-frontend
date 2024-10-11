import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUserId = localStorage.getItem('userId');
    if (storedAccessToken && storedRefreshToken && storedUserId) {
      setIsAuthenticated(true);
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  const login = (tokens: AuthTokens, userId: string) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setUserId(userId);
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/logout', { refresh_token: refreshToken });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
      setAccessToken(null);
      setRefreshToken(null);
      setUserId(null);
      router.push('/auth/signin');
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const response = await axiosInstance.post('/refresh', { refresh_token: refreshToken });
      const newAccessToken = response.data.access_token;
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  };

  return { isAuthenticated, isLoading, login, logout, accessToken, refreshAccessToken, userId };
}

// Remove this line
// export const refreshAccessToken = useAuth().refreshAccessToken;

// Instead, create a standalone function that doesn't rely on hooks
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axiosInstance.post('/refresh', { refresh_token: refreshToken });
    const newAccessToken = response.data.access_token;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    return null;
  }
}