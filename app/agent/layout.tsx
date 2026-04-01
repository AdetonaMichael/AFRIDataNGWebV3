'use client';

import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/shared/Spinner';
import { LogOut, Menu, Settings, X } from 'lucide-react';
import Link from 'next/link';

const agentNavItems = [
  { label: 'Dashboard', href: '/agent' },
  { label: 'Customers', href: '/agent/customers' },
  { label: 'Commissions', href: '/agent/commissions' },
  { label: 'Performance', href: '/agent/performance' },
  { label: 'Support', href: '/agent/support' },
];

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is agent
    if (!user) {
      router.push('/login');
      return;
    }

    const isAgent = user.roles?.some((r) => r === 'agent');
    if (!isAgent) {
      router.push('/dashboard');
      return;
    }

    setLoading(false);
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#a9b7ff] text-[#0a0a0a] transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-[#9da9ff]">
            <h1 className="text-2xl font-bold">AGENT</h1>
            <p className="text-[#0a0a0a]/70 text-sm">AFRIDataNG</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {agentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="block px-4 py-2 rounded-lg text-[#0a0a0a]/70 hover:bg-[#9da9ff] hover:text-[#0a0a0a] transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="border-t border-[#9da9ff] px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white text-sm">{user?.first_name} {user?.last_name}</p>
                <p className="text-[#0a0a0a]/70 text-xs">Agent</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-[#9da9ff] rounded-lg transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between md:justify-end">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
