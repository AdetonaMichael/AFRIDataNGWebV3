'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Spinner } from '@/components/shared/Spinner';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (user && !user.roles?.some((r) => r === 'admin')) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage users, transactions, and system settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: '0', change: '+0%' },
          { title: 'Total Revenue', value: '₦0.00', change: '+0%' },
          { title: 'Active Transactions', value: '0', change: '+0%' },
          { title: 'System Health', value: '100%', change: '✓' },
        ].map((stat) => (
          <Card key={stat.title}>
            <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className={stat.change.startsWith('+') ? 'text-green-600 text-sm' : 'text-gray-600 text-sm'}>
              {stat.change}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Users', href: '/admin/users' },
            { label: 'Agents', href: '/admin/agents' },
            { label: 'Transactions', href: '/admin/transactions' },
            { label: 'Reports', href: '/admin/reports' },
          ].map((action) => (
            <Button key={action.href} variant="outline" fullWidth>
              {action.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
        <p className="text-gray-600">
          Full admin dashboard with user management, analytics, reports, and more features
          will be implemented soon.
        </p>
      </Card>
    </div>
  );
}
