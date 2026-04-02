'use client';

import React from 'react';
import { Toast } from '@/components/shared/Toast';
import { AuthInitializer } from '@/components/AuthInitializer';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthInitializer>
      <>
        {children}
        <Toast />
      </>
    </AuthInitializer>
  );
};
