'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  CreditCard,
  TrendingUp,
  Wallet,
} from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Spinner } from '@/components/shared/Spinner';
import { walletService } from '@/services/wallet.service';
import { transactionService } from '@/services/transaction.service';
import { formatCurrency, formatRelativeTime } from '@/utils/format.utils';
import { TRANSACTION_STATUSES } from '@/utils/constants';

type WalletData = {
  balance: number;
  currency?: string;
  total_spent?: number;
};

type TransactionData = {
  id: string | number;
  type: string;
  provider?: string;
  amount: number;
  status: string;
  created_at: string;
};

const quickActions = [
  {
    href: '/dashboard/airtime',
    label: 'Buy Airtime',
    description: 'Top up any network instantly',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    href: '/dashboard/data',
    label: 'Buy Data',
    description: 'Activate data plans in seconds',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    href: '/dashboard/bills',
    label: 'Pay Bills',
    description: 'Electricity, TV and utilities',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    href: '/dashboard/settings',
    label: 'Account Settings',
    description: 'Manage profile and preferences',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
];

const getTransactionVisual = (type: string) => {
  const normalized = type?.toLowerCase?.() || '';

  if (normalized.includes('airtime')) {
    return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=300&q=80';
  }

  if (normalized.includes('data')) {
    return 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=300&q=80';
  }

  if (
    normalized.includes('electricity') ||
    normalized.includes('bill') ||
    normalized.includes('tv')
  ) {
    return 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=300&q=80';
  }

  return 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=300&q=80';
};

export default function DashboardPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [walletRes, transactionsRes] = await Promise.all([
          walletService.getBalance(),
          transactionService.getTransactions({ per_page: 5 }),
        ]);

        if (walletRes?.data?.wallet) {
          setWallet(walletRes.data.wallet);
        }

        // Handle transaction response - it has nested structure with data.data
        if (transactionsRes?.data?.data) {
          console.log('[Dashboard] Loaded transactions:', transactionsRes.data.data);
          setTransactions(transactionsRes.data.data);
        } else if (transactionsRes?.data) {
          console.log('[Dashboard] Transaction response:', transactionsRes.data);
          // Fallback in case structure is different
          const txData = transactionsRes.data as any;
          if (Array.isArray(txData)) {
            setTransactions(txData);
          }
        } else {
          console.warn('[Dashboard] No transaction data found in response:', transactionsRes);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setTransactions([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const monthlyTransactionsCount = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return transactions.filter((transaction) => {
      const createdAt = new Date(transaction.created_at);
      return (
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    }).length;
  }, [transactions]);

  const successfulTransactionsCount = useMemo(() => {
    return transactions.filter(
      (transaction) => transaction.status?.toLowerCase() === 'success'
    ).length;
  }, [transactions]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

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

      {/* Top Hero */}
      <section className="relative overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-[#0b1220] p-6 sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,95,247,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#cbd5e1] sm:text-base">
              Here is a clean overview of your wallet activity, recent transactions,
              and the fastest actions you may want to take today.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Wallet Balance
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {wallet ? formatCurrency(wallet.balance, wallet.currency) : '₦0.00'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                This Month
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {monthlyTransactionsCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Successful
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {successfulTransactionsCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#6b7280]">Available Balance</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                {wallet ? formatCurrency(wallet.balance, wallet.currency) : '₦0.00'}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Ready for airtime, data, and bill payments
              </p>
            </div>

            <div className="rounded-2xl bg-[#eef2ff] p-3">
              <Wallet className="h-5 w-5 text-[#4a5ff7]" />
            </div>
          </div>
        </Card>

        <Card className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#6b7280]">Transactions This Month</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                {monthlyTransactionsCount}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Completed activities for the current month
              </p>
            </div>

            <div className="rounded-2xl bg-[#eef2ff] p-3">
              <CreditCard className="h-5 w-5 text-[#4a5ff7]" />
            </div>
          </div>
        </Card>

        <Card className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#6b7280]">Lifetime Spend</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                {wallet ? formatCurrency(wallet.total_spent || 0, wallet.currency) : '₦0.00'}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Total value of all processed transactions
              </p>
            </div>

            <div className="rounded-2xl bg-[#eef2ff] p-3">
              <TrendingUp className="h-5 w-5 text-[#4a5ff7]" />
            </div>
          </div>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-[#6b7280]">
              Jump straight into the most common services.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="group block">
              <div className="overflow-hidden rounded-[24px] border border-[#e5e7eb] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                <div
                  className="relative h-40 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${action.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white">{action.label}</h3>
                    <p className="mt-1 text-sm text-white/85">{action.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm font-semibold text-[#111827]">
                    Open service
                  </span>
                  <div className="rounded-full bg-[#eef2ff] p-2 transition-colors group-hover:bg-[#4a5ff7]">
                    <ArrowRight className="h-4 w-4 text-[#4a5ff7] group-hover:text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Transactions */}
      <section>
        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                Recent Transactions
              </h2>
              <p className="mt-1 text-sm text-[#6b7280]">
                Your latest account activity at a glance.
              </p>
            </div>

            <Link
              href="/dashboard/history"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5ff7] hover:underline"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {transactions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#d1d5db] bg-[#fafafa] px-6 py-14 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-[#eef2ff]" />
              <h3 className="text-lg font-semibold text-[#111827]">
                No transactions yet
              </h3>
              <p className="mt-2 text-sm text-[#6b7280]">
                Once you start transacting, your latest activity will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => {
                const status =
                  TRANSACTION_STATUSES[
                    transaction.status as keyof typeof TRANSACTION_STATUSES
                  ];

                return (
                  <div
                    key={transaction.id}
                    className="flex flex-col gap-4 rounded-[22px] border border-[#f1f5f9] bg-[#fcfcfd] p-4 transition-colors hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className="h-14 w-14 flex-shrink-0 rounded-2xl bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${getTransactionVisual(transaction.type)})`,
                        }}
                      />

                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold capitalize text-[#111827]">
                          {transaction.type.replace(/_/g, ' ')}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#6b7280]">
                          <span>{transaction.provider || 'Service transaction'}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{formatRelativeTime(transaction.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-base font-bold text-[#111827]">
                          -{formatCurrency(transaction.amount, wallet?.currency)}
                        </p>
                        <p className="mt-1 text-xs text-[#9ca3af]">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>

                      <Badge variant={status?.color as any} size="sm">
                        {status?.label || transaction.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}