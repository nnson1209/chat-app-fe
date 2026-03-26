'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useUserStore } from '@/store/useUserStore';
import { authService } from '@/services/auth.service';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      // Client-side only (useEffect doesn't run on server)
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          const response = await authService.myInfo();
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          clearUser();
        }
      }
      setIsInitialized(true);
    };

    initAuth();
  }, [setUser, clearUser]);

  // Render a consistent shell on both server + initial client render
  if (!isInitialized) {
    return (
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '100dvh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
}