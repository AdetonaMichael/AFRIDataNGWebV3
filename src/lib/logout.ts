import { clearAllIdempotencyKeys } from '@/utils/idempotency.utils';
import { clearAuthTokens } from '@/utils/token.utils';

/**
 * Handle user logout with cleanup
 * 
 * This is a utility function for programmatic logout (SSR/SSG context)
 * For client-side logout, use useAuth hook or useAuthStore directly
 * 
 * Clears all session data, tokens, and idempotency keys
 */
export const handleLogout = async (): Promise<void> => {
  try {
    console.log('[Logout] Initiating logout...');

    // Clear all stored idempotency keys on logout
    clearAllIdempotencyKeys();

    // Clear all auth tokens and data
    clearAuthTokens();

    console.log('[Logout] All session data cleared');

    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  } catch (error) {
    console.error('[Logout] Logout failed:', error);
    // Force logout even if there's an error
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }
};

/**
 * Handle logout with custom redirect
 * @param redirectUrl - Where to redirect after logout (default: /auth/login)
 */
export const handleLogoutWithRedirect = async (redirectUrl: string = '/auth/login'): Promise<void> => {
  try {
    console.log('[Logout] Initiating logout with redirect to:', redirectUrl);

    clearAllIdempotencyKeys();
    clearAuthTokens();

    console.log('[Logout] All session data cleared, redirecting...');

    if (typeof window !== 'undefined') {
      window.location.href = redirectUrl;
    }
  } catch (error) {
    console.error('[Logout] Logout failed:', error);
    if (typeof window !== 'undefined') {
      window.location.href = redirectUrl;
    }
  }
};

