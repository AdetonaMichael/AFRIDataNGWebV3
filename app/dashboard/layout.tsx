'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Send,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Phone,
  Wifi,
  FileText,
  Gift,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/shared/Button';
import { clsx } from 'clsx';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/airtime', label: 'Buy Airtime', icon: Phone },
    { href: '/dashboard/data', label: 'Buy Data', icon: Wifi },
    { href: '/dashboard/bills', label: 'Pay Bills', icon: FileText },
    { href: '/dashboard/history', label: 'History', icon: Activity },
    { href: '/dashboard/referral', label: 'Referral', icon: Gift },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={clsx(
          'bg-gray-900 text-white transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20',
          'hidden md:flex flex-col'
        )}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-gray-800">
          {sidebarOpen && <div className="text-2xl font-bold bg-gradient-to-r from-[#a9b7ff] to-[#9da9ff] bg-clip-text text-transparent">AFRIDataNG</div>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                  active
                    ? 'bg-[#a9b7ff] text-[#0a0a0a]'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-500 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 flex items-center justify-between ml-4 md:ml-0">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/settings" className="text-gray-700 hover:text-gray-900">
                {user ? `${user.first_name} ${user.last_name}` : 'User'}
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-gray-100 border-b border-gray-200 px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                    active
                      ? 'bg-[#a9b7ff] text-[#0a0a0a]'
                      : 'text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
