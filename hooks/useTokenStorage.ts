import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export function useTokenStorage() {
  const [tokens, setTokens] = useState<Tokens>({
    accessToken: null,
    refreshToken: null,
  });

  useEffect(() => {
    const storedRefreshToken = Cookies.get('refreshToken');
    if (storedRefreshToken) {
      setTokens(prev => ({ ...prev, refreshToken: storedRefreshToken }));
    }
  }, []);

  const setAccessToken = (token: string | null) => {
    setTokens(prev => ({ ...prev, accessToken: token }));
  };

  const setRefreshToken = (token: string | null) => {
    if (token) {
      Cookies.set('refreshToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    } else {
      Cookies.remove('refreshToken');
    }
    setTokens(prev => ({ ...prev, refreshToken: token }));
  };

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    setAccessToken,
    setRefreshToken,
  };
}
