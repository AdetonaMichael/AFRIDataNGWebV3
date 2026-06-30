'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { isTokenLikelyExpired, getTokenExpirationTime } from '@/utils/token.utils';

interface UseSessionMonitorOptions {
  /**
   * Check token expiration every N milliseconds
   * @default 60000 (1 minute)
   */
  checkInterval?: number;

  /**
   * Warn user when token expires in N milliseconds
   * @default 300000 (5 minutes)
   */
  warningThreshold?: number;

  /**
   * Auto-logout when token expires
   * @default true
   */
  autoLogout?: boolean;

  /**
   * Callback when token is about to expire
   */
  onExpirationWarning?: (timeRemaining: number) => void;

  /**
   * Callback when token expires
   */
  onTokenExpired?: () => void;
}

/**
 * useSessionMonitor Hook
 * 
 * Monitors session/token status in real-time and handles expiration gracefully.
 * Prevents endless loops by detecting token expiration early and logging out proactively.
 * 
 * Usage:
 * ```tsx
 * export default function Dashboard() {
 *   useSessionMonitor({
 *     onExpirationWarning: (ms) => console.log(`Token expires in ${ms}ms`),
 *     onTokenExpired: () => console.log('Token expired'),
 *   });
 *   
 *   return <div>Dashboard</div>;
 * }
 * ```
 */
export const useSessionMonitor = (options: UseSessionMonitorOptions = {}) => {
  const {
    checkInterval = 60000, // 1 minute
    warningThreshold = 300000, // 5 minutes
    autoLogout = true,
    onExpirationWarning,
    onTokenExpired,
  } = options;

  const router = useRouter();
  const { isAuthenticated, logout, handleSessionExpired } = useAuthStore();
  const { addToast } = useUIStore();
  
  const checkIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const warningShownRef = useRef(false);
  const hasLoggedOutRef = useRef(false);

  const handleTokenExpiration = useCallback(() => {
    if (hasLoggedOutRef.current) return;
    
    console.log('[SessionMonitor] Token expired - logging out');
    hasLoggedOutRef.current = true;

    // Use Zustand store to handle session expiration
    handleSessionExpired();
    
    onTokenExpired?.();
    
    addToast({
      type: 'error',
      message: 'Your session has expired. Please log in again.',
    });

    // Redirect to login
    router.replace('/auth/login?session_expired=true');
  }, [handleSessionExpired, onTokenExpired, addToast, router]);

  const checkTokenStatus = useCallback(() => {
    if (!isAuthenticated) return;

    try {
      const isExpired = isTokenLikelyExpired();
      
      if (isExpired) {
        console.warn('[SessionMonitor] Token is expired');
        if (autoLogout) {
          handleTokenExpiration();
        }
        return;
      }

      const timeRemaining = getTokenExpirationTime();
      
      if (timeRemaining !== null && timeRemaining > 0) {
        // Check if within warning threshold
        if (timeRemaining <= warningThreshold && !warningShownRef.current) {
          console.warn('[SessionMonitor] Token expiring soon - showing warning');
          warningShownRef.current = true;
          
          onExpirationWarning?.(timeRemaining);
          
          addToast({
            type: 'warning',
            message: `Your session will expire in ${Math.ceil(timeRemaining / 60000)} minutes. Please save your work.`,
          });
        }
      }
    } catch (error) {
      console.error('[SessionMonitor] Error checking token status:', error);
    }
  }, [isAuthenticated, warningThreshold, autoLogout, handleTokenExpiration, onExpirationWarning, addToast]);

  // Set up interval to check token status
  useEffect(() => {
    if (!isAuthenticated) {
      // Clear interval if user logs out
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = undefined;
      }
      warningShownRef.current = false;
      hasLoggedOutRef.current = false;
      return;
    }

    // Check immediately on mount
    checkTokenStatus();

    // Then set up interval
    checkIntervalRef.current = setInterval(checkTokenStatus, checkInterval);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = undefined;
      }
    };
  }, [isAuthenticated, checkInterval, checkTokenStatus]);

  return {
    checkTokenStatus,
    handleTokenExpiration,
  };
};
