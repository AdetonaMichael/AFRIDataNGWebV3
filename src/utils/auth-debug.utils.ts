/**
 * Auth Debug Utilities
 * 
 * Helps diagnose authentication and state issues
 */

export const debugAuthState = () => {
  if (typeof window === 'undefined') return;

  try {
    // Check localStorage
    console.log('=== AUTH STATE DEBUG ===');
    
    const token = localStorage.getItem('token');
    console.log('Token in localStorage:', !!token ? `${token.substring(0, 20)}...` : 'NOT FOUND');

    // Check auth store
    const authStore = localStorage.getItem('auth-store');
    if (authStore) {
      try {
        const parsed = JSON.parse(authStore);
        console.log('Auth Store:', {
          state: parsed.state,
          version: parsed.version,
        });
      } catch (e) {
        console.log('Auth Store (raw):', authStore);
      }
    } else {
      console.log('Auth Store: NOT FOUND');
    }

    // Check Zustand store directly
    try {
      const { useAuthStore } = require('@/store/auth.store');
      const state = useAuthStore.getState?.();
      console.log('Zustand Current State:', {
        isAuthenticated: state?.isAuthenticated,
        user: state?.user ? `${state.user.email || 'no-email'}` : null,
        activeRole: state?.activeRole,
        isLoading: state?.isLoading,
        sessionExpired: state?.sessionExpired,
      });
    } catch (e) {
      console.log('Could not access Zustand store');
    }

    console.log('==================');
  } catch (error) {
    console.error('Debug error:', error);
  }
};

/**
 * Log auth store updates for debugging
 */
export const monitorAuthStore = () => {
  if (typeof window === 'undefined') return;

  try {
    const { useAuthStore } = require('@/store/auth.store');
    const store = useAuthStore;
    
    // Subscribe to changes
    const unsubscribe = store.subscribe(
      (state: any) => state.user,
      (user: any) => {
        console.log('[AuthStore Monitor] User changed:', user ? user.email : 'null');
      }
    );

    return unsubscribe;
  } catch (e) {
    console.warn('Could not setup auth store monitoring');
  }
};

/**
 * Check if auth state matches token
 */
export const checkAuthConsistency = () => {
  if (typeof window === 'undefined') return null;

  try {
    const token = localStorage.getItem('token');
    const { useAuthStore } = require('@/store/auth.store');
    const state = useAuthStore.getState?.();

    const hasToken = !!token;
    const isAuthenticated = state?.isAuthenticated;

    const consistent = hasToken === isAuthenticated;

    console.log('[AuthConsistency]', {
      hasToken,
      isAuthenticated,
      consistent,
    });

    if (!consistent) {
      console.warn('⚠️  AUTH STATE MISMATCH - Token and isAuthenticated are out of sync');
    }

    return consistent;
  } catch (e) {
    console.error('Error checking consistency:', e);
  }
};

/**
 * Force auth re-initialization (useful for debugging)
 */
export const reinitializeAuth = () => {
  if (typeof window === 'undefined') return;

  try {
    console.log('[ReinitAuth] Forcing auth re-initialization...');
    
    // Clear all auth state
    localStorage.removeItem('token');
    localStorage.removeItem('auth-store');

    // Clear Zustand
    const { useAuthStore } = require('@/store/auth.store');
    useAuthStore.getState?.()?.logout();

    console.log('[ReinitAuth] Auth cleared, reloading page...');
    
    // Reload to trigger re-initialization
    window.location.reload();
  } catch (e) {
    console.error('Error reinitializing:', e);
  }
};
