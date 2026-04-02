'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { userService } from '@/services/auth.service';

/**
 * AuthInitializer Component
 * 
 * This component runs on app mount to:
 * 1. Check if there's a stored token in localStorage
 * 2. Verify the token is still valid by fetching user profile
 * 3. Restore user state to Zustand store
 * 4. Clear invalid tokens
 */
export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setIsLoading, logout } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (token) {
          console.log('[AuthInitializer] Found token in localStorage, verifying...');
          
          // Try to fetch user profile to verify token is valid
          const response = await userService.getProfile();

          if (response.success && response.data?.user) {
            console.log('[AuthInitializer] Token valid, restoring user:', response.data.user);
            // User is authenticated - restore to store
            setUser(response.data.user);
          } else {
            console.warn('[AuthInitializer] Token invalid or user fetch failed');
            // Token is invalid - clear it
            logout();
          }
        } else {
          console.log('[AuthInitializer] No token in localStorage');
          // Ensure store is clear
          logout();
        }
      } catch (error: any) {
        console.error('[AuthInitializer] Auth initialization error:', error);
        // On error, clear auth state
        logout();
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setUser, setIsLoading, logout]);

  // Don't render children until auth is initialized to prevent flash
  if (!isInitialized) {
    return <div className="min-h-screen bg-white" />;
  }

  return <>{children}</>;
};
