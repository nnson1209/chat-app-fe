'use client';

import { useEffect, useState } from 'react';
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
      // Chỉ chạy trên client
      if (typeof window === 'undefined') return;
      
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

  // Trên server, luôn render children để tránh hydration mismatch
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // Trên client, chờ initialization
  if (!isInitialized) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#36393f',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #404249',
            borderTop: '4px solid #5865f2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}