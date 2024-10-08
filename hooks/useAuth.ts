import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by verifying the token)
    const token = sessionStorage.getItem('accessToken');
    const storedUserId = sessionStorage.getItem('userId');
    if (token && storedUserId) {
      setIsAuthenticated(true);
      setAccessToken(token);
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userId: string) => {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setAccessToken(token);
    setUserId(userId);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserId(null);
    router.push('/auth/signin');
  };

  return { isAuthenticated, isLoading, login, logout, accessToken, userId };
}