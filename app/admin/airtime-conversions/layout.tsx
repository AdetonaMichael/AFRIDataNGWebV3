'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Spinner } from '@/components/shared/Spinner';

/**
 * Checks whether the user has the admin role.
 *
 * user.roles can come back in several shapes depending on the API:
 *   - string[]              → ['admin', 'user']
 *   - { name: string }[]   → [{ id: 1, name: 'admin' }]
 *   - undefined / null
 *
 * This helper handles all three cases safely.
 */
function isAdmin(user: any): boolean {
  if (!user) return false;
  const roles = user.roles;
  if (!Array.isArray(roles) || roles.length === 0) return false;

  return roles.some((role: any) => {
    if (typeof role === 'string') return role === 'admin';
    if (typeof role === 'object' && role !== null) {
      // Handle { name: 'admin' } or { slug: 'admin' }
      return role.name === 'admin' || role.slug === 'admin';
    }
    return false;
  });
}

export default function AirtimeConversionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // Only redirect once the user object has loaded (not null/undefined)
    if (user !== undefined && user !== null && !isAdmin(user)) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Still loading auth state — show spinner
  if (user === undefined || user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Auth loaded but not admin — show spinner briefly while redirect fires
  if (!isAdmin(user)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}