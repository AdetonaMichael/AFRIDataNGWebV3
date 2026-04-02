'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Users2,
  Wallet,
} from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Spinner } from '@/components/shared/Spinner';

type TrendDirection = 'up' | 'down';

type MetricItem = {
  value: number | string;
  change: string;
  trend: TrendDirection;
};

type TopProvider = {
  name: string;
  transactions: number;
  revenue: number;
};

type TopService = {
  name: string;
  percentage: number;
  revenue: number;
};

type RevenueTrendItem = {
  day: string;
  revenue: number;
};

type ServiceBreakdownItem = {
  name: string;
  percentage: number;
};

type AnalyticsMetrics = {
  daily_revenue: MetricItem;
  daily_transactions: MetricItem;
  success_rate: MetricItem;
  avg_transaction_value: MetricItem;
  active_users: MetricItem;
  new_users: MetricItem;
  top_provider: TopProvider;
  top_service: TopService;
  revenue_trend: RevenueTrendItem[];
  service_breakdown: ServiceBreakdownItem[];
};

function formatCurrency(value: number) {
  return `₦${value.toLocaleString()}`;
}

function formatCompactCurrency(value: number) {
  if (value >= 1000000) return `₦${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `₦${(value / 1000).toFixed(0)}K`;
  return `₦${value.toLocaleString()}`;
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);

  useEffect(() => {
    setMetrics({
      daily_revenue: { value: 2500000, change: '+12%', trend: 'up' },
      daily_transactions: { value: 1250, change: '+8%', trend: 'up' },
      success_rate: { value: '98.5%', change: '+0.3%', trend: 'up' },
      avg_transaction_value: { value: 2000, change: '-5%', trend: 'down' },
      active_users: { value: 5420, change: '+15%', trend: 'up' },
      new_users: { value: 180, change: '+22%', trend: 'up' },
      top_provider: { name: 'MTN', transactions: 450, revenue: 900000 },
      top_service: { name: 'Airtime', percentage: 45, revenue: 1125000 },
      revenue_trend: [
        { day: 'Mon', revenue: 1650000 },
        { day: 'Tue', revenue: 1820000 },
        { day: 'Wed', revenue: 1740000 },
        { day: 'Thu', revenue: 1960000 },
        { day: 'Fri', revenue: 2250000 },
        { day: 'Sat', revenue: 2140000 },
        { day: 'Sun', revenue: 2050000 },
      ],
      service_breakdown: [
        { name: 'Airtime', percentage: 45 },
        { name: 'Data', percentage: 35 },
        { name: 'Bills', percentage: 15 },
        { name: 'Other', percentage: 5 },
      ],
    });
    setLoading(false);
  }, []);

  const revenueMax = useMemo(() => {
    if (!metrics?.revenue_trend?.length) return 1;
    return Math.max(...metrics.revenue_trend.map((item) => item.revenue));
  }, [metrics]);

  const summary = useMemo(() => {
    if (!metrics) return null;

    const dailyRevenue =
      typeof metrics.daily_revenue.value === 'number'
        ? metrics.daily_revenue.value
        : 0;

    const dailyTransactions =
      typeof metrics.daily_transactions.value === 'number'
        ? metrics.daily_transactions.value
        : 0;

    const avgTransaction =
      typeof metrics.avg_transaction_value.value === 'number'
        ? metrics.avg_transaction_value.value
        : 0;

    const activeUsers =
      typeof metrics.active_users.value === 'number'
        ? metrics.active_users.value
        : 0;

    return {
      dailyRevenue,
      dailyTransactions,
      avgTransaction,
      activeUsers,
    };
  }, [metrics]);

  if (loading || !metrics || !summary) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2ff]">
            <Spinner />
          </div>
          <p className="text-sm font-medium text-[#6b7280]">
            Loading analytics dashboard...
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Daily Revenue',
      value:
        typeof metrics.daily_revenue.value === 'number'
          ? formatCurrency(metrics.daily_revenue.value)
          : metrics.daily_revenue.value,
      change: metrics.daily_revenue.change,
      trend: metrics.daily_revenue.trend,
      icon: Wallet,
      note: 'Total processed revenue today',
    },
    {
      label: 'Daily Transactions',
      value:
        typeof metrics.daily_transactions.value === 'number'
          ? metrics.daily_transactions.value.toLocaleString()
          : metrics.daily_transactions.value,
      change: metrics.daily_transactions.change,
      trend: metrics.daily_transactions.trend,
      icon: CreditCard,
      note: 'All completed platform requests today',
    },
    {
      label: 'Success Rate',
      value: metrics.success_rate.value.toString(),
      change: metrics.success_rate.change,
      trend: metrics.success_rate.trend,
      icon: CheckCircle2,
      note: 'Successful transaction completion rate',
    },
    {
      label: 'Active Users',
      value:
        typeof metrics.active_users.value === 'number'
          ? metrics.active_users.value.toLocaleString()
          : metrics.active_users.value,
      change: metrics.active_users.change,
      trend: metrics.active_users.trend,
      icon: Users2,
      note: 'Users active on the platform today',
    },
    {
      label: 'New Users',
      value:
        typeof metrics.new_users.value === 'number'
          ? metrics.new_users.value.toLocaleString()
          : metrics.new_users.value,
      change: metrics.new_users.change,
      trend: metrics.new_users.trend,
      icon: Activity,
      note: 'New signups recorded today',
    },
    {
      label: 'Avg Transaction Value',
      value:
        typeof metrics.avg_transaction_value.value === 'number'
          ? formatCurrency(metrics.avg_transaction_value.value)
          : metrics.avg_transaction_value.value,
      change: metrics.avg_transaction_value.change,
      trend: metrics.avg_transaction_value.trend,
      icon: BarChart3,
      note: 'Average spend per transaction',
    },
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
              Admin Intelligence
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Analytics Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#cbd5e1] sm:text-base">
              Monitor revenue flow, transaction volume, platform performance, and
              user growth from one executive-level command view.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Revenue Today
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {formatCompactCurrency(summary.dailyRevenue)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Transactions
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {summary.dailyTransactions.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Active Users
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {summary.activeUsers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((metric) => {
          const Icon = metric.icon;
          const isUp = metric.trend === 'up';

          return (
            <Card
              key={metric.label}
              className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#6b7280]">{metric.label}</p>
                  <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                    {metric.note}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#eef2ff] p-3">
                  <Icon className="h-5 w-5 text-[#4a5ff7]" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <div
                  className={classNames(
                    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold',
                    isUp
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  )}
                >
                  {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {metric.change}
                </div>
                <span className="text-xs text-[#9ca3af]">vs previous period</span>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Revenue Trend + Service Breakdown */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                Revenue Trend
              </h2>
              <p className="mt-1 text-sm text-[#6b7280]">
                Revenue performance across the last 7 days.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4a5ff7]">
              <ArrowUpRight size={14} />
              Weekly overview
            </div>
          </div>

          <div className="space-y-5">
            {metrics.revenue_trend.map((item) => {
              const width = `${(item.revenue / revenueMax) * 100}%`;

              return (
                <div key={item.day} className="grid grid-cols-[48px_1fr_auto] items-center gap-4">
                  <span className="text-sm font-semibold text-[#6b7280]">{item.day}</span>

                  <div className="h-3 overflow-hidden rounded-full bg-[#eef2f7]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#4a5ff7_0%,#a9b7ff_100%)]"
                      style={{ width }}
                    />
                  </div>

                  <span className="text-sm font-bold text-[#111827]">
                    {formatCompactCurrency(item.revenue)}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
              Service Breakdown
            </h2>
            <p className="mt-1 text-sm text-[#6b7280]">
              Distribution of transaction volume by service category.
            </p>
          </div>

          <div className="space-y-5">
            {metrics.service_breakdown.map((service, index) => (
              <div key={service.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#111827]">
                    {service.name}
                  </span>
                  <span className="text-sm font-bold text-[#4a5ff7]">
                    {service.percentage}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-[#eef2f7]">
                  <div
                    className={classNames(
                      'h-full rounded-full',
                      index === 0 && 'bg-[#4a5ff7]',
                      index === 1 && 'bg-[#7c8cff]',
                      index === 2 && 'bg-[#a9b7ff]',
                      index === 3 && 'bg-[#cfd6ff]'
                    )}
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Top Provider / Top Service / Snapshot */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <h2 className="text-xl font-bold tracking-tight text-[#111827]">
            Top Provider
          </h2>

          <div className="mt-5 rounded-[24px] border border-[#dbe4ff] bg-[#f7f8ff] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4a5ff7]">
              Leading network
            </p>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
              {metrics.top_provider.name}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                  Transactions
                </p>
                <p className="mt-2 text-2xl font-bold text-[#111827]">
                  {metrics.top_provider.transactions.toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                  Revenue
                </p>
                <p className="mt-2 text-2xl font-bold text-[#111827]">
                  {formatCompactCurrency(metrics.top_provider.revenue)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <h2 className="text-xl font-bold tracking-tight text-[#111827]">
            Top Service
          </h2>

          <div className="mt-5 rounded-[24px] border border-[#dcfce7] bg-[#f0fdf4] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-700">
              Best-performing category
            </p>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
              {metrics.top_service.name}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                  Share
                </p>
                <p className="mt-2 text-2xl font-bold text-[#111827]">
                  {metrics.top_service.percentage}%
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                  Revenue
                </p>
                <p className="mt-2 text-2xl font-bold text-[#111827]">
                  {formatCompactCurrency(metrics.top_service.revenue)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <h2 className="text-xl font-bold tracking-tight text-[#111827]">
            Executive Snapshot
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-[#f8fafc] p-4">
              <p className="text-sm font-medium text-[#6b7280]">Revenue per active user</p>
              <p className="mt-2 text-2xl font-bold text-[#111827]">
                {summary.activeUsers > 0
                  ? formatCurrency(
                      Math.round(summary.dailyRevenue / summary.activeUsers)
                    )
                  : '₦0'}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8fafc] p-4">
              <p className="text-sm font-medium text-[#6b7280]">Average transaction value</p>
              <p className="mt-2 text-2xl font-bold text-[#111827]">
                {formatCurrency(summary.avgTransaction)}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8fafc] p-4">
              <p className="text-sm font-medium text-[#6b7280]">Health indicator</p>
              <p className="mt-2 text-base font-semibold text-green-700">
                Strong daily operational performance
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}