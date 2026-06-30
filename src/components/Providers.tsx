'use client';

import React, { useEffect } from 'react';
import { Toast } from '@/components/shared/Toast';
import { AuthInitializer } from '@/components/AuthInitializer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SessionExpiredHandler } from '@/components/SessionExpiredHandler';
import { initializeDebugLogging } from '@/utils/debug.utils';
import { initializeErrorTracking } from '@/utils/error-tracking.utils';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    // Initialize comprehensive error tracking
    initializeErrorTracking();
    console.log('[Providers] Error tracking initialized');
    
    // Initialize debug logging for mobile error tracking
    initializeDebugLogging();
    console.log('[Providers] Debug logging initialized');
  }, []);

  return (
    <ErrorBoundary>
      <AuthInitializer>
        <SessionExpiredHandler>
          <>
            {children}
            <Toast />
          </>
        </SessionExpiredHandler>
      </AuthInitializer>
    </ErrorBoundary>
  );
};
