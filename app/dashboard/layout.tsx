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
  Tv,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/shared/Button';
import { Topbar } from '@/components/shared/Topbar';
import { AuthProtected } from '@/components/AuthProtected';
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
    { href: '/dashboard/tv', label: 'TV Subscription', icon: Tv },
    { href: '/dashboard/bills', label: 'Electricity Token', icon: FileText },
    { href: '/dashboard/history', label: 'History', icon: Activity },
    { href: '/dashboard/referral', label: 'Referral', icon: Gift },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <AuthProtected requireAuth={true}>
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
        <Topbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} mobileMenuOpen={mobileMenuOpen} />

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Mobile menu overlay"
          />
        )}

        {/* Mobile Sidebar Menu */}
        <div
          className={clsx(
            'fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 flex flex-col transition-transform duration-300 md:hidden',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Sidebar Header */}
          <div className="px-6 py-6 border-b border-gray-800 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#a9b7ff] to-[#9da9ff] bg-clip-text text-transparent">
              AFRIDataNG
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-8 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
                    active
                      ? 'bg-[#a9b7ff] text-[#0a0a0a]'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  )}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="px-3 py-4 border-t border-gray-800">
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
    </AuthProtected>
  );
};

export default DashboardLayout;
