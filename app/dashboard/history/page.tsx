'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Filter,
  ReceiptText,
  Search,
  Wallet,
} from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { Spinner } from '@/components/shared/Spinner';
import { Select } from '@/components/shared/Select';
import { transactionService } from '@/services/transaction.service';
import { formatCurrency, formatDate } from '@/utils/format.utils';
import { TRANSACTION_STATUSES, TRANSACTION_TYPES } from '@/utils/constants';

type TransactionStatusKey = keyof typeof TRANSACTION_STATUSES;
type TransactionTypeKey = keyof typeof TRANSACTION_TYPES;

type TransactionItem = {
  id: string | number;
  created_at: string;
  type: string;
  provider?: string;
  amount: number;
  status: string;
  reference?: string;
};

type TransactionsResponse = {
  data?: {
    data?: TransactionItem[];
    current_page?: number;
    last_page?: number;
    total?: number;
    per_page?: number;
  };
};

type FiltersState = {
  status: string;
  type: string;
  search: string;
};

const INITIAL_FILTERS: FiltersState = {
  status: '',
  type: '',
  search: '',
};

function getStatusBadgeVariant(status: string) {
  const normalized = status as TransactionStatusKey;
  return TRANSACTION_STATUSES[normalized]?.color ?? 'secondary';
}

function getStatusLabel(status: string) {
  const normalized = status as TransactionStatusKey;
  return TRANSACTION_STATUSES[normalized]?.label ?? status;
}

function getTypeLabel(type: string) {
  const normalized = type as TransactionTypeKey;
  return TRANSACTION_TYPES[normalized]?.label ?? type.replace(/_/g, ' ');
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 20,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        const res: TransactionsResponse = await transactionService.getTransactions({
          page,
          per_page: 20,
          status: filters.status || undefined,
          type: filters.type || undefined,
          search: filters.search || undefined,
        });

        const payload = res?.data;

        setTransactions(payload?.data ?? []);
        setPagination({
          currentPage: payload?.current_page ?? page,
          lastPage: payload?.last_page ?? 1,
          total: payload?.total ?? 0,
          perPage: payload?.per_page ?? 20,
        });
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page, filters]);

  const stats = useMemo(() => {
    const totalAmount = transactions.reduce(
      (sum, transaction) => sum + Number(transaction.amount || 0),
      0
    );

    const successfulCount = transactions.filter(
      (transaction) => transaction.status?.toLowerCase() === 'completed'
    ).length;

    const pendingCount = transactions.filter(
      (transaction) => transaction.status?.toLowerCase() === 'pending'
    ).length;

    return {
      totalAmount,
      successfulCount,
      pendingCount,
    };
  }, [transactions]);

  const hasActiveFilters = Boolean(
    filters.search.trim() || filters.status || filters.type
  );

  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setPage(1);
    setFilters(INITIAL_FILTERS);
  };

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

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[30px] border border-[#e5e7eb] bg-[#0b1220] px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,95,247,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)]" />

        <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c7d2fe]">
              Transaction Center
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Transaction History
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#cbd5e1] sm:text-base">
              Review your payments, monitor statuses, and keep track of all recent
              activity from one clean and searchable view.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Visible Transactions
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {transactions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Successful
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {stats.successfulCount}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Pending
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {stats.pendingCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#6b7280]">Current Page</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                {pagination.currentPage}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Browsing paginated transaction records
              </p>
            </div>

            <div className="rounded-2xl bg-[#eef2ff] p-3">
              <ReceiptText className="h-5 w-5 text-[#4a5ff7]" />
            </div>
          </div>
        </Card>

        <Card className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#6b7280]">Visible Volume</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                {formatCurrency(stats.totalAmount)}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Sum of amounts shown on this page
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
              <p className="text-sm font-medium text-[#6b7280]">Total Records</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                {pagination.total}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">
                Total transactions available from the API
              </p>
            </div>

            <div className="rounded-2xl bg-[#eef2ff] p-3">
              <CreditCard className="h-5 w-5 text-[#4a5ff7]" />
            </div>
          </div>
        </Card>
      </section>

      {/* Filters */}
      <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
              Filters
            </h2>
            <p className="mt-1 text-sm text-[#6b7280]">
              Search and narrow down your transaction records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {hasActiveFilters ? (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="h-11 rounded-xl border-[#d1d5db] px-5"
              >
                Reset Filters
              </Button>
            ) : null}

            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-[#d1d5db] px-5"
            >
              <ArrowDownToLine size={16} />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <Input
            placeholder="Search by ID, provider, reference..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            icon={<Search size={18} />}
          />

          <Select
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'completed', label: 'Completed' },
              { value: 'pending', label: 'Pending' },
              { value: 'failed', label: 'Failed' },
            ]}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          />

          <Select
            options={[
              { value: '', label: 'All Types' },
              { value: 'airtime', label: 'Airtime' },
              { value: 'data', label: 'Data' },
              { value: 'bills', label: 'Bills' },
            ]}
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          />

          <div className="flex items-center rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-4">
            <Filter className="mr-3 h-4 w-4 text-[#6b7280]" />
            <span className="text-sm font-medium text-[#6b7280]">
              {hasActiveFilters ? 'Custom filters active' : 'Showing all transactions'}
            </span>
          </div>
        </div>
      </Card>

      {/* Transactions */}
      <Card className="overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-white p-0 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
        <div className="border-b border-[#f1f5f9] px-6 py-5">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
            Transaction Records
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            A full list of your recent transaction activity.
          </p>
        </div>

        {transactions.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eef2ff]">
              <ReceiptText className="h-8 w-8 text-[#4a5ff7]" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-[#111827]">
              No transactions found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#6b7280]">
              We could not find any transaction matching your current filters.
              Try adjusting the search terms or resetting the filters.
            </p>
            {hasActiveFilters ? (
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={clearFilters}
                  className="h-11 rounded-xl bg-[#4a5ff7] px-6 text-white hover:bg-[#3b4fe0]"
                >
                  Clear Filters
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-[#f1f5f9] bg-[#fcfcfd]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Provider
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Reference
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-[#f8fafc] transition-colors hover:bg-[#fafafa]"
                    >
                      <td className="px-6 py-4 text-sm text-[#111827]">
                        {formatDate(transaction.created_at)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1 text-sm font-medium capitalize text-[#111827]">
                          {getTypeLabel(transaction.type)}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm capitalize text-[#111827]">
                        {transaction.provider || '—'}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6b7280]">
                        {transaction.reference || `TXN-${transaction.id}`}
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-bold text-[#111827]">
                        {formatCurrency(transaction.amount)}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <Badge variant={getStatusBadgeVariant(transaction.status) as any}>
                          {getStatusLabel(transaction.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-4 p-4 lg:hidden">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-[22px] border border-[#edf2f7] bg-[#fcfcfd] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-bold capitalize text-[#111827]">
                        {getTypeLabel(transaction.type)}
                      </p>
                      <p className="mt-1 text-sm text-[#6b7280]">
                        {transaction.provider || 'Service transaction'}
                      </p>
                    </div>

                    <Badge variant={getStatusBadgeVariant(transaction.status) as any}>
                      {getStatusLabel(transaction.status)}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                        Date
                      </p>
                      <p className="mt-1 text-sm text-[#111827]">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                        Amount
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#111827]">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                        Reference
                      </p>
                      <p className="mt-1 break-all text-sm text-[#6b7280]">
                        {transaction.reference || `TXN-${transaction.id}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* Pagination */}
      <div className="flex flex-col gap-4 rounded-[24px] border border-[#e5e7eb] bg-white px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[#6b7280]">
          Showing page{' '}
          <span className="font-semibold text-[#111827]">{pagination.currentPage}</span>{' '}
          of{' '}
          <span className="font-semibold text-[#111827]">{pagination.lastPage}</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={pagination.currentPage <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="h-11 rounded-xl border-[#d1d5db] px-4"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          <div className="rounded-xl bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#111827]">
            {pagination.currentPage}
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={pagination.currentPage >= pagination.lastPage}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination.lastPage))
            }
            className="h-11 rounded-xl border-[#d1d5db] px-4"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}