'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { userService } from '@/services/auth.service';
import { safeGetItem } from '@/utils/safe-storage.utils';
import { trackAuthError, trackStorageError } from '@/utils/error-tracking.utils';

/**
 * AuthInitializer Component
 * 
 * This component runs on app mount to:
 * 1. Check if there's a stored token in localStorage
 * 2. Verify the token is still valid by fetching user profile
 * 3. Restore user state to Zustand store
 * 4. Clear invalid tokens
 * 
 * Uses proper hydration guards and safe storage access for mobile compatibility
 */
export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setIsLoading, logout } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only initializes on client after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const initializeAuth = async () => {
      try {
        console.log('[AuthInitializer] Starting auth initialization...');
        setIsLoading(true);
        
        console.log('[AuthInitializer] Checking for token in storage...');
        let token: string | null = null;
        
        try {
          token = typeof window !== 'undefined' ? safeGetItem('token') : null;
          console.log('[AuthInitializer] Token found:', !!token);
        } catch (storageError: any) {
          console.error('[AuthInitializer] Storage error while getting token:', storageError);
          trackStorageError('get', 'token', storageError, {
            step: 'auth_initialization',
          });
          token = null;
        }

        if (token) {
          console.log('[AuthInitializer] Found token in localStorage, verifying...');
          
          try {
            // Try to fetch user profile to verify token is valid
            console.log('[AuthInitializer] Fetching user profile...');
            const response = await userService.getProfile();
            console.log('[AuthInitializer] Profile fetch response:', response);

            if (response.success && response.data?.user) {
              console.log('[AuthInitializer] Token valid, restoring user:', response.data.user);
              // User is authenticated - restore to store
              setUser(response.data.user);
            } else {
              console.warn('[AuthInitializer] Token invalid or user fetch failed');
              trackAuthError('profile_fetch', new Error('Invalid response from profile endpoint'), {
                response,
              });
              // Token is invalid - clear it
              logout();
            }
          } catch (fetchError: any) {
            console.error('[AuthInitializer] Error fetching user profile:', fetchError);
            trackAuthError('profile_fetch', fetchError, {
              endpoint: '/users/profile',
              message: fetchError?.message,
            });
            logout();
          }
        } else {
          console.log('[AuthInitializer] No token in localStorage');
          // Ensure store is clear
          logout();
        }
      } catch (error: any) {
        console.error('[AuthInitializer] Auth initialization error:', error);
        console.error('[AuthInitializer] Error details:', {
          message: error?.message,
          stack: error?.stack,
          code: error?.code,
        });
        trackAuthError('initialization', error, {
          phase: 'auth_setup',
        });
        // On error, clear auth state
        logout();
      } finally {
        console.log('[AuthInitializer] Auth initialization complete');
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [isMounted, setUser, setIsLoading, logout]);

  // Prevent rendering until hydration is complete and auth is initialized
  if (!isMounted || !isInitialized) {
    return <div className="min-h-screen bg-white" />;
  }

  return <>{children}</>;
};
