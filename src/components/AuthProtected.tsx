'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Spinner } from '@/components/shared/Spinner';
import { debugError } from '@/utils/debug.utils';
import { hasValidToken, isTokenLikelyExpired, isReferenceToken, getStoredToken } from '@/utils/token.utils';

interface AuthProtectedProps {
  children: React.ReactNode;
  /**
   * If true, allows only authenticated users (e.g., /dashboard)
   * If false, allows only unauthenticated users (e.g., /auth/login)
   */
  requireAuth?: boolean;
}

/**
 * AuthProtected Component
 * 
 * Protects routes based on authentication status:
 * - requireAuth=true: Only authenticated users can access (redirects to login)
 * - requireAuth=false: Only unauthenticated users can access (redirects to dashboard)
 * 
 * Also performs real-time token validation to prevent infinite loops on expiration
 */
export const AuthProtected: React.FC<AuthProtectedProps> = ({
  children,
  requireAuth = true,
}) => {
  const router = useRouter();
  const { isAuthenticated, logout, sessionExpired } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    try {
      // If session was marked as expired, log out immediately
      if (sessionExpired) {
        console.log('[AuthProtected] Session expired flag detected, logging out');
        logout();
        setShouldRedirect('/auth/login?session_expired=true');
        return;
      }

      // Check auth requirements
      if (requireAuth) {
        // Page requires authentication
        if (!isAuthenticated) {
          console.log('[AuthProtected] User not authenticated, will redirect to login');
          setShouldRedirect('/auth/login');
          return;
        }

        // Real-time token validation for authenticated routes
        const tokenValid = hasValidToken();
        const token = getStoredToken();
        const isReference = isReferenceToken(token || '');
        const tokenExpired = isTokenLikelyExpired();

        console.log('[AuthProtected] Token validation check:', {
          tokenValid,
          tokenExpired,
          isReferenceToken: isReference,
          tokenLength: token?.length,
          requireAuth,
          isAuthenticated,
        });

        if (!tokenValid) {
          console.warn('[AuthProtected] Token is missing - logging out proactively');
          logout();
          setShouldRedirect('/auth/login?token_expired=true');
          return;
        }

        // If it's a reference token (not a JWT), we can't validate expiration client-side
        // Let the API handle it on request - if invalid, 401 will trigger logout
        if (isReference) {
          console.log('[AuthProtected] Reference token detected - will validate on API request');
          setCanRender(true);
          return;
        }

        // For JWT tokens, check expiration client-side
        if (tokenExpired) {
          console.warn('[AuthProtected] JWT token is expired - logging out proactively');
          logout();
          setShouldRedirect('/auth/login?token_expired=true');
          return;
        }

        // All checks passed - can render
        setCanRender(true);
      } else {
        // Page requires NO authentication (auth pages)
        if (isAuthenticated) {
          console.log('[AuthProtected] User is authenticated, redirecting from auth page to dashboard');
          setShouldRedirect('/dashboard');
          return;
        }

        // User is not authenticated, can render public page
        setCanRender(true);
      }
    } catch (error: any) {
      debugError('[AuthProtected] Error during auth check:', error);
      setCanRender(true); // Allow rendering on error to prevent stuck state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, isAuthenticated, requireAuth, sessionExpired]);

  // Handle redirects
  useEffect(() => {
    if (shouldRedirect) {
      console.log('[AuthProtected] Redirecting to:', shouldRedirect);
      router.replace(shouldRedirect);
    }
  }, [shouldRedirect, router]);

  // Show loading while checking auth
  if (!isMounted || !canRender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};
