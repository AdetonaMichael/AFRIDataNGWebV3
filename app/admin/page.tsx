'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Database,
  FileBarChart2,
  Gauge,
  Gift,
  Landmark,
  Layers3,
  ReceiptText,
  RefreshCcw,
  Send,
  Settings2,
  ShieldCheck,
  Smartphone,
  UserCog,
  Users2,
  Wallet,
  Wifi,
} from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Spinner } from '@/components/shared/Spinner';
import { useAuthStore } from '@/store/auth.store';

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const isAdmin = useMemo(() => {
    return Boolean(user?.roles?.some((role) => role === 'admin'));
  }, [user]);

  useEffect(() => {
    if (user && !isAdmin) {
      router.push('/dashboard');
    }
  }, [user, isAdmin, router]);

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2ff]">
            <Spinner />
          </div>
          <p className="text-sm font-medium text-[#6b7280]">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  /**
   * Replace these with real API data later.
   * Keep structure stable so UI is ready for backend wiring.
   */
  const stats = [
    {
      title: 'Total Users',
      value: '12,480',
      note: 'Registered users on platform',
      change: '+8.2%',
      trend: 'up',
      icon: Users2,
    },
    {
      title: 'Today Revenue',
      value: '₦4,250,000',
      note: 'Successful transactions today',
      change: '+12.5%',
      trend: 'up',
      icon: Wallet,
    },
    {
      title: 'Transactions Today',
      value: '2,184',
      note: 'Across all supported services',
      change: '+6.1%',
      trend: 'up',
      icon: CreditCard,
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      note: 'Platform-wide service success',
      change: 'Healthy',
      trend: 'neutral',
      icon: Gauge,
    },
  ];

  const serviceCards = [
    {
      title: 'Airtime',
      volume: '₦1.4M',
      transactions: '842 txns',
      status: 'Stable',
      icon: Smartphone,
    },
    {
      title: 'Data Bundles',
      volume: '₦1.1M',
      transactions: '603 txns',
      status: 'Stable',
      icon: Wifi,
    },
    {
      title: 'Airtime to Cash',
      volume: '₦520K',
      transactions: '96 conversions',
      status: 'Monitored',
      icon: RefreshCcw,
    },
    {
      title: 'Referrals',
      volume: '₦180K',
      transactions: '34 payouts',
      status: 'Stable',
      icon: Gift,
    },
  ];

  const quickActions = [
    {
      title: 'Users',
      description: 'Manage users, profiles, and account access.',
      href: '/admin/users',
      icon: Users2,
    },
    {
      title: 'Roles & Permissions',
      description: 'Control roles, permissions, and admin access.',
      href: '/admin/roles',
      icon: ShieldCheck,
    },
    {
      title: 'Transactions',
      description: 'Review all payments, logs, and transaction records.',
      href: '/admin/transactions',
      icon: ReceiptText,
    },
    {
      title: 'VTU Services',
      description: 'Manage airtime, data, and other service configurations.',
      href: '/admin/services',
      icon: Layers3,
    },
    {
      title: 'Notifications',
      description: 'Manage DB, push, and email notification flows.',
      href: '/admin/notifications',
      icon: BellRing,
    },
    {
      title: 'Reports',
      description: 'View business reports and operational summaries.',
      href: '/admin/reports',
      icon: FileBarChart2,
    },
  ];

  const pendingQueues = [
    {
      title: 'Referral Withdrawal Requests',
      count: 12,
      amount: '₦145,000',
      href: '/admin/referrals/withdrawals',
    },
    {
      title: 'Airtime-to-Cash Withdrawals',
      count: 8,
      amount: '₦92,500',
      href: '/admin/airtime-to-cash/withdrawals',
    },
    {
      title: 'Pending Transaction Reviews',
      count: 17,
      amount: '₦318,000',
      href: '/admin/transactions?status=pending',
    },
    {
      title: 'Notification Failures',
      count: 6,
      amount: 'Needs attention',
      href: '/admin/notifications/logs',
    },
  ];

  const activityFeed = [
    {
      title: 'New referral payout request submitted',
      meta: 'Michael A. • ₦15,000 • 8 mins ago',
      type: 'referral',
    },
    {
      title: 'Airtime-to-cash withdrawal approved',
      meta: 'User ID #2841 • ₦22,500 • 14 mins ago',
      type: 'withdrawal',
    },
    {
      title: 'Push notification campaign delivered',
      meta: '1,240 recipients • 32 mins ago',
      type: 'notification',
    },
    {
      title: 'New admin role updated',
      meta: 'Permissions changed for Support Manager • 1 hr ago',
      type: 'security',
    },
    {
      title: 'High transaction traffic detected on data service',
      meta: '603 successful transactions today • 2 hrs ago',
      type: 'traffic',
    },
  ];

  const notificationStats = [
    { label: 'DB Notifications', value: '8,421', color: 'bg-[#eef2ff] text-[#4a5ff7]' },
    { label: 'Push Notifications', value: '2,184', color: 'bg-[#ecfdf3] text-[#16a34a]' },
    { label: 'Email Notifications', value: '1,092', color: 'bg-[#fff7ed] text-[#ea580c]' },
  ];

  const moduleHealth = [
    { label: 'Wallet System', status: 'Operational' },
    { label: 'VTU Processing', status: 'Operational' },
    { label: 'Referral Engine', status: 'Operational' },
    { label: 'Notification Service', status: 'Partial Review' },
    { label: 'Withdrawal Queue', status: 'Operational' },
    { label: 'Roles & Permissions', status: 'Operational' },
  ];

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="space-y-8"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[30px] border border-[#e5e7eb] bg-[#0b1220] px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,95,247,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)]" />

        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c7d2fe]">
              Virtual Top-Up Admin Center
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#cbd5e1] sm:text-base">
              Monitor users, transactions, referrals, notifications, withdrawals,
              and service performance from one operational control surface.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Access Level
              </p>
              <p className="mt-3 text-lg font-bold text-white">Administrator</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Active Modules
              </p>
              <p className="mt-3 text-lg font-bold text-white">12 Modules</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Platform Status
              </p>
              <p className="mt-3 text-lg font-bold text-white">Healthy</p>
            </div>
          </div>
        </div>
      </section>

      {/* KPI */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#6b7280]">{stat.title}</p>
                  <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[#6b7280]">{stat.note}</p>
                </div>

                <div className="rounded-2xl bg-[#eef2ff] p-3">
                  <Icon className="h-5 w-5 text-[#4a5ff7]" />
                </div>
              </div>

              <div className="mt-5">
                <span
                  className={classNames(
                    'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                    stat.trend === 'up'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-slate-100 text-slate-700'
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Quick actions */}
      <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Jump directly into the most important admin operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link key={action.href} href={action.href} className="group block">
                <div className="rounded-[24px] border border-[#e5e7eb] bg-[#fcfcfd] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#cfd8ff] hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-[#eef2ff] p-3">
                      <Icon className="h-5 w-5 text-[#4a5ff7]" />
                    </div>

                    <div className="rounded-full bg-[#eef2ff] p-2 transition-colors group-hover:bg-[#4a5ff7]">
                      <ArrowRight className="h-4 w-4 text-[#4a5ff7] group-hover:text-white" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-[#111827]">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Operational overview */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                Service Performance
              </h2>
              <p className="mt-1 text-sm text-[#6b7280]">
                Monitor live-performing services and transaction distribution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {serviceCards.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="rounded-[24px] border border-[#edf2f7] bg-[#fcfcfd] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl bg-[#eef2ff] p-3">
                      <Icon className="h-5 w-5 text-[#4a5ff7]" />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {service.status}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-[#111827]">
                    {service.title}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                        Volume
                      </p>
                      <p className="mt-2 text-lg font-bold text-[#111827]">
                        {service.volume}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                        Activity
                      </p>
                      <p className="mt-2 text-lg font-bold text-[#111827]">
                        {service.transactions}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
              Pending Queues
            </h2>
            <p className="mt-1 text-sm text-[#6b7280]">
              Items that require admin attention or approval.
            </p>
          </div>

          <div className="space-y-4">
            {pendingQueues.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block rounded-[22px] border border-[#edf2f7] bg-[#fcfcfd] p-4 transition hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#6b7280]">{item.amount}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4a5ff7]">
                      {item.count}
                    </span>
                    <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      {/* Activity + notification + health */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.9fr_0.9fr]">
        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Latest admin-relevant events across the platform.
          </p>

          <div className="mt-6 space-y-4">
            {activityFeed.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex items-start gap-4 rounded-[22px] border border-[#edf2f7] bg-[#fcfcfd] p-4"
              >
                <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#4a5ff7]" />
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-[#6b7280]">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
            Notification Overview
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Delivery activity across your notification channels.
          </p>

          <div className="mt-6 space-y-4">
            {notificationStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-[#edf2f7] bg-[#fcfcfd] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#111827]">{item.label}</p>
                  <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', item.color)}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}

            <div className="rounded-[22px] border border-[#dbeafe] bg-[#eff6ff] p-4">
              <div className="flex items-start gap-3">
                <Send className="mt-0.5 h-5 w-5 text-[#2563eb]" />
                <div>
                  <p className="text-sm font-semibold text-[#1e3a8a]">
                    Notification engine
                  </p>
                  <p className="mt-1 text-sm text-[#1d4ed8]">
                    DB, push, and email notification systems are active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#dbe4ff] bg-[#f8faff] p-6 sm:p-7 shadow-[0_10px_35px_rgba(74,95,247,0.06)]">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-[#4a5ff7] p-3">
              <Settings2 className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                System Health
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                Overview of operational modules and internal platform state.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {moduleHealth.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-[#e6ecff] bg-white px-4 py-3"
              >
                <span className="text-sm font-medium text-[#111827]">{item.label}</span>
                <span
                  className={classNames(
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    item.status === 'Operational'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-amber-50 text-amber-700'
                  )}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[22px] border border-[#c7d2fe] bg-white px-5 py-4">
            <div className="flex items-start gap-3">
              <Database className="mt-0.5 h-5 w-5 text-[#4a5ff7]" />
              <div>
                <p className="text-sm font-semibold text-[#111827]">
                  Admin modules covered
                </p>
                <p className="mt-1 text-sm leading-6 text-[#6b7280]">
                  Users, roles, permissions, transactions, VTU services,
                  notifications, referrals, withdrawals, and airtime-to-cash flows.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Bottom action strip */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Link href="/admin/transactions" className="block">
          <div className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <div className="rounded-2xl bg-[#eef2ff] p-3 w-fit">
              <Landmark className="h-5 w-5 text-[#4a5ff7]" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#111827]">
              Financial Oversight
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#6b7280]">
              Review transaction flow, revenue, pending payouts, and operational money movement.
            </p>
          </div>
        </Link>

        <Link href="/admin/users" className="block">
          <div className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <div className="rounded-2xl bg-[#eef2ff] p-3 w-fit">
              <UserCog className="h-5 w-5 text-[#4a5ff7]" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#111827]">
              User Administration
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#6b7280]">
              Manage users, agent records, access rules, and role assignments from one place.
            </p>
          </div>
        </Link>

        <Link href="/admin/notifications" className="block">
          <div className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <div className="rounded-2xl bg-[#eef2ff] p-3 w-fit">
              <BellRing className="h-5 w-5 text-[#4a5ff7]" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#111827]">
              Communication Control
            </h3>
            <p className="mt-2 text-sm leading-7 text-[#6b7280]">
              Track notification delivery across database, push, and email channels.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}