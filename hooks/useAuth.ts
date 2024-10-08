import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    // Check if the user is authenticated by verifying the tokens
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
      // Call the logout endpoint
      const response = await fetch('http://127.0.0.1:8000/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear tokens and user data regardless of logout API success
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
      const response = await fetch('http://127.0.0.1:8000/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
        localStorage.setItem('accessToken', data.access_token);
        return data.access_token;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  };

  return { isAuthenticated, isLoading, login, logout, accessToken, refreshAccessToken, userId };
}