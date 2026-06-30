'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { safeGetItem } from '@/utils/safe-storage.utils';
import { hasValidToken, isTokenLikelyExpired, clearAuthTokens } from '@/utils/token.utils';

/**
 * AuthInitializer Component
 * 
 * This component runs on app mount to:
 * 1. Check if there's a stored token in localStorage
 * 2. Validate token format and expiration (client-side check)
 * 3. Clear invalid/expired tokens proactively
 * 4. Restore auth state from Zustand persistence middleware
 * 5. Prevent infinite loops on token expiration
 * 
 * Token validation happens via:
 * - Client-side JWT expiration check (prevents requests with expired tokens)
 * - API interceptors on first authenticated request (catches server-side invalidation)
 * 
 * Uses proper hydration guards and safe storage access for mobile compatibility.
 */
export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, user, isAuthenticated, setIsLoading: setAuthLoading } = useAuthStore();
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
        
        console.log('[AuthInitializer] Checking for token in storage...');
        let hasToken = false;
        let tokenIsExpired = false;
        
        try {
          hasToken = hasValidToken();
          console.log('[AuthInitializer] Valid token found:', hasToken);
          
          if (hasToken) {
            // Check if token is likely expired (JWT exp claim check)
            tokenIsExpired = isTokenLikelyExpired();
            console.log('[AuthInitializer] Token is likely expired:', tokenIsExpired);
            
            if (tokenIsExpired) {
              console.warn('[AuthInitializer] Token is expired on client - clearing auth proactively');
              clearAuthTokens();
              logout();
            }
          }
        } catch (storageError: any) {
          console.error('[AuthInitializer] Storage error while checking token:', storageError);
          hasToken = false;
        }

        // Log current store state
        console.log('[AuthInitializer] Store state:', {
          isAuthenticated,
          user: user ? user.email : 'null',
          hasToken,
        });

        if (hasToken && !tokenIsExpired) {
          console.log('[AuthInitializer] Found valid token, session restored via Zustand persistence');
          // Token exists and appears valid - Zustand persistence will restore user state
          // Full token validation will occur on first API call via auth interceptor
        } else if (!hasToken) {
          console.log('[AuthInitializer] No valid token found - user is not authenticated');
          // No token - ensure auth is cleared
          if (isAuthenticated || user) {
            console.log('[AuthInitializer] Clearing invalid auth state (token missing but auth store had data)');
            logout();
          }
        } else if (tokenIsExpired) {
          console.log('[AuthInitializer] Token is expired - user needs to re-login');
          // Token was already cleared above
        }
      } catch (error: any) {
        console.error('[AuthInitializer] Auth initialization error:', error);
        // On error, clear auth to be safe
        logout();
      } finally {
        console.log('[AuthInitializer] Auth initialization complete');
        setAuthLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
    // Only run on mount, don't depend on user/isAuthenticated to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  // Prevent rendering until hydration is complete and auth is initialized
  if (!isMounted || !isInitialized) {
    return <div className="min-h-screen bg-white" />;
  }

  return <>{children}</>;
};
