'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { useUIStore } from '@/store/ui.store';
import { adminService } from '@/services/admin.service';
import { Spinner } from '@/components/shared/Spinner';
import { formatCurrency, formatDate } from '@/utils/format.utils';
import { AirtimeConversion, AirtimeConversionFilters, AirtimeNetwork } from '@/types/api.types';

interface FilterState {
  status?: string;
  network?: string;
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
  search?: string;
  sortBy?: 'date' | 'amount';
  sortOrder?: 'asc' | 'desc';
}

const NETWORKS: AirtimeNetwork[] = ['MTN', 'Airtel', '9mobile', 'Glo'];
const STATUSES = [
  { value: 'pending',    label: 'Pending',    color: 'yellow' },
  { value: 'confirmed',  label: 'Confirmed',  color: 'blue'   },
  { value: 'processing', label: 'Processing', color: 'purple' },
  { value: 'completed',  label: 'Completed',  color: 'green'  },
  { value: 'rejected',   label: 'Rejected',   color: 'red'    },
  { value: 'failed',     label: 'Failed',     color: 'red'    },
];

export default function AirtimeConversionsPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useUIStore();

  const [conversions, setConversions]               = useState<AirtimeConversion[]>([]);
  const [loading, setLoading]                       = useState(true);
  const [selectedConversions, setSelectedConversions] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters]               = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    status:    searchParams.get('status')    || undefined,
    network:   searchParams.get('network')   || undefined,
    search:    searchParams.get('search')    || undefined,
    sortBy:    (searchParams.get('sortBy')    as any) || 'date',
    sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
  });

  const [pagination, setPagination] = useState({
    page:     1,
    perPage:  20,
    total:    0,
    lastPage: 1,
  });

  // ── Fetch ──────────────────────────────────────────────────────────────
  const fetchConversions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminService.getAirtimeConversions({
        page:     pagination.page,
        per_page: pagination.perPage,
        ...filters,
      } as AirtimeConversionFilters);

      console.log('[AirtimeConversions] full response:', response);
      console.log('[AirtimeConversions] response.data:', response.data);

      // API shape: response.data = { data: [...], pagination: { current_page, total, last_page, ... } }
      const paginatedData = response.data;

      if (paginatedData && Array.isArray(paginatedData.data)) {
        setConversions(paginatedData.data);
        setPagination((prev) => ({
          ...prev,
          total:    paginatedData.pagination.total    ?? 0,
          lastPage: paginatedData.pagination.last_page ?? 1,
        }));
      } else {
        console.warn('[AirtimeConversions] Unexpected response shape:', paginatedData);
        addToast({ type: 'error', message: 'Failed to parse conversions response' });
      }
    } catch (error) {
      console.error('[AirtimeConversions] Error fetching conversions:', error);
      addToast({ type: 'error', message: 'Error fetching airtime conversions' });
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, filters, addToast]);

  useEffect(() => {
    fetchConversions();
  }, [fetchConversions]);

  // ── Filter helpers ─────────────────────────────────────────────────────
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // ── Selection helpers ──────────────────────────────────────────────────
  const handleSelectConversion = (id: number) => {
    setSelectedConversions((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedConversions(
      selectedConversions.size === conversions.length
        ? new Set()
        : new Set(conversions.map((c) => c.id)),
    );
  };

  // ── Status helpers ─────────────────────────────────────────────────────
  const getStatusBadgeVariant = (
    status: string,
  ): 'default' | 'success' | 'danger' | 'warning' | 'info' => {
    const statusObj = STATUSES.find((s) => s.value === status);
    const colorMap: Record<string, 'default' | 'success' | 'danger' | 'warning' | 'info'> = {
      yellow: 'warning',
      blue:   'info',
      purple: 'info',
      green:  'success',
      red:    'danger',
      gray:   'default',
    };
    return colorMap[statusObj?.color || 'gray'] || 'default';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':                return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected': case 'failed':  return <XCircle      className="h-4 w-4" />;
      case 'processing': case 'confirmed': return <Clock    className="h-4 w-4" />;
      default:                         return <AlertCircle  className="h-4 w-4" />;
    }
  };

  // ── Derived stats ──────────────────────────────────────────────────────
  const pendingCount = conversions.filter((c) => c.status === 'pending').length;
  const totalAmount  = conversions.reduce((sum, c) => {
    const v = typeof c.discounted_amount === 'string'
      ? parseFloat(c.discounted_amount)
      : (c.discounted_amount || 0);
    return sum + (isNaN(v) ? 0 : v);
  }, 0);

  const safeFormatCurrency = (value: any): string => {
    if (!value && value !== 0) return formatCurrency(0);
    const n = typeof value === 'string' ? parseFloat(value) : value;
    return formatCurrency(isNaN(n) ? 0 : n);
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Airtime Conversions</h1>
            <p className="text-gray-600 mt-1">
              Manage and process user airtime to cash conversion requests
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/admin/airtime-conversions/analytics')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            Analytics
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
              <AlertCircle className="h-12 w-12 text-yellow-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total in Queue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, transaction ID, or phone..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="ghost" className="flex items-center gap-2 whitespace-nowrap">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status || ''}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Statuses</option>
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                  <select
                    value={filters.network || ''}
                    onChange={(e) => handleFilterChange('network', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Networks</option>
                    {NETWORKS.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={filters.dateFrom || ''}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={filters.dateTo || ''}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={filters.sortBy || 'date'}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner />
            </div>
          ) : conversions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No airtime conversions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedConversions.size === conversions.length && conversions.length > 0}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    {['User', 'Network', 'Amount', 'Commission', 'Status', 'Date', 'Action'].map((h) => (
                      <th
                        key={h}
                        className={`px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider ${h === 'Action' ? 'text-center' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {conversions.map((conversion) => (
                    <tr key={conversion.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedConversions.has(conversion.id)}
                          onChange={() => handleSelectConversion(conversion.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {conversion.user?.first_name} {conversion.user?.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{conversion.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="default">{conversion.network}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {safeFormatCurrency(conversion.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {safeFormatCurrency(conversion.discounted_amount)} (user receives)
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-red-600">
                          {safeFormatCurrency(conversion.commission)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(conversion.status)}
                          <Badge variant={getStatusBadgeVariant(conversion.status)}>
                            {STATUSES.find((s) => s.value === conversion.status)?.label || conversion.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(conversion.created_at)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/airtime-conversions/${conversion.id}`)}
                          className="inline-flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.lastPage > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.lastPage} · {pagination.total} total
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={pagination.page === pagination.lastPage}
                  onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}