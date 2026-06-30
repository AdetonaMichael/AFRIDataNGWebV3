'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

/**
 * SessionExpiredHandler Component
 * 
 * Handles session expiration scenarios triggered via URL parameters:
 * - ?session_expired=true - Session expired due to token expiration
 * - ?token_expired=true - Token expired/invalid
 * 
 * Should be placed in root layout to catch session expiration events
 */
export const SessionExpiredHandler: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  const { logout } = useAuthStore();
  const { addToast } = useUIStore();

  useEffect(() => {
    const sessionExpired = searchParams.get('session_expired');
    const tokenExpired = searchParams.get('token_expired');

    if (sessionExpired === 'true' || tokenExpired === 'true') {
      console.log('[SessionExpiredHandler] Session expiration detected');
      
      // Ensure auth is cleared
      logout();

      // Show appropriate message
      if (sessionExpired === 'true') {
        addToast({
          type: 'error',
          message: 'Your session has expired. Please log in again.',
          duration: 5000,
        });
      } else if (tokenExpired === 'true') {
        addToast({
          type: 'error',
          message: 'Your authentication token has expired. Please log in again.',
          duration: 5000,
        });
      }
    }
  }, [searchParams, logout, addToast]);

  return <>{children}</>;
};
