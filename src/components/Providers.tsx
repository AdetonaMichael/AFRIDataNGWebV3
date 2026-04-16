'use client';

import React, { useEffect } from 'react';
import { Toast } from '@/components/shared/Toast';
import { AuthInitializer } from '@/components/AuthInitializer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initializeDebugLogging } from '@/utils/debug.utils';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    // Initialize debug logging for mobile error tracking
    initializeDebugLogging();
  }, []);

  return (
    <ErrorBoundary>
      <AuthInitializer>
        <>
          {children}
          <Toast />
        </>
      </AuthInitializer>
    </ErrorBoundary>
  );
};
