'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { useUIStore } from '@/store/ui.store';
import { adminService } from '@/services/admin.service';
import { Spinner } from '@/components/shared/Spinner';
import { formatCurrency } from '@/utils/format.utils';
import { AirtimeConversionAnalytics } from '@/types/api.types';

type PeriodType = 'today' | 'week' | 'month' | 'year';

function safeCurrency(value: any): string {
  if (!value && value !== 0) return formatCurrency(0);
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return formatCurrency(isNaN(n) ? 0 : n);
}

function safePct(numerator: number, denominator: number): string {
  if (!denominator) return '0.0%';
  return ((numerator / denominator) * 100).toFixed(1) + '%';
}

export default function AirtimeConversionsAnalyticsPage() {
  const router = useRouter();
  const { addToast } = useUIStore();

  const [analytics, setAnalytics] = useState<AirtimeConversionAnalytics | null>(null);
  const [loading, setLoading]     = useState(true);
  const [period, setPeriod]       = useState<PeriodType>('month');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await adminService.getAirtimeConversionAnalytics(period);

        console.log('[Analytics] full response:', response);
        console.log('[Analytics] response.data:', response.data);

        // API returns { data: AirtimeConversionAnalytics }
        const analyticsData = response.data?.data;
        console.log('[Analytics] analyticsData:', analyticsData);

        if (analyticsData && analyticsData.summary) {
          setAnalytics(analyticsData);
        } else {
          console.warn('[Analytics] Unexpected response shape:', analyticsData);
          addToast({ type: 'error', message: 'Failed to parse analytics response' });
        }
      } catch (error) {
        console.error('[Analytics] Error fetching analytics:', error);
        addToast({ type: 'error', message: 'Error fetching analytics' });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period, addToast]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // ── Empty / error state ──────────────────────────────────────────────────
  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">No analytics data available for this period.</p>
            <p className="text-gray-400 text-sm mt-2">Try selecting a different time range.</p>
          </Card>
        </div>
      </div>
    );
  }

  const { summary, financial, performance, by_network } = analytics;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Airtime Conversion Analytics</h1>
            <p className="text-gray-600 mt-1">
              Performance metrics and insights ·{' '}
              <span className="font-medium text-gray-800">
                {(analytics as any).period || period}
              </span>
            </p>
          </div>

          {/* Period selector */}
          <div className="flex gap-2 flex-shrink-0 self-end">
            {(['today', 'week', 'month', 'year'] as PeriodType[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'primary' : 'secondary'}
                onClick={() => setPeriod(p)}
                size="sm"
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* ── Overview Metrics ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{summary?.total_requests ?? 0}</p>
              </div>
              <Users className="h-12 w-12 text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">{summary?.completed ?? 0}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {safePct(summary?.completed ?? 0, summary?.total_requests ?? 0)} of total
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{summary?.pending ?? 0}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {safePct(summary?.pending ?? 0, summary?.total_requests ?? 0)} of total
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-yellow-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{summary?.rejected ?? 0}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {safePct(summary?.rejected ?? 0, summary?.total_requests ?? 0)} of total
                </p>
              </div>
              <TrendingDown className="h-12 w-12 text-red-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* ── Financial + Performance ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Financial */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Financial Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Total Original Amount</span>
                <span className="font-medium text-gray-900">
                  {safeCurrency(financial?.total_original_amount)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Total Commission</span>
                <span className="font-medium text-red-600">
                  -{safeCurrency(financial?.total_commission)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Total Discounted Amount</span>
                <span className="font-medium text-gray-900">
                  {safeCurrency(financial?.total_discounted_amount)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Avg Commission Rate</span>
                <span className="font-medium text-gray-900">
                  {(financial?.average_commission_percentage ?? 0).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-base font-semibold text-gray-900">Total Funded</span>
                <span className="text-lg font-bold text-green-600">
                  {safeCurrency(financial?.total_funded)}
                </span>
              </div>
            </div>
          </Card>

          {/* Performance */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Approval Rate</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-green-600">
                    {(performance?.approval_rate ?? 0).toFixed(2)}%
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Rejection Rate</span>
                <span className="font-medium text-red-600">
                  {(performance?.rejection_rate ?? 0).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Avg Processing Time</span>
                <span className="font-medium text-gray-900">
                  {Math.abs(performance?.average_processing_time_hours ?? 0).toFixed(1)}h
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Slowest Processing</span>
                <span className="font-medium text-gray-900">
                  {Math.abs(performance?.slowest_processing_hours ?? 0).toFixed(1)}h
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-600">Fastest Processing</span>
                <span className="font-medium text-gray-900">
                  {Math.abs(performance?.fastest_processing_minutes ?? 0).toFixed(0)}m
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Network Breakdown ── */}
        {by_network && Object.keys(by_network).length > 0 ? (
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Network Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(by_network).map(([network, data]: [string, any]) => (
                <div
                  key={network}
                  className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{network}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {(data?.percentage ?? 0).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{data?.count ?? 0}</p>
                  <p className="text-xs text-gray-500 mb-2">requests</p>
                  <p className="text-sm font-medium text-gray-700">{safeCurrency(data?.amount)}</p>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Network Breakdown</h2>
            <p className="text-sm text-gray-500">No network data available for this period.</p>
          </Card>
        )}

        {/* ── Status Distribution ── */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Status Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Pending',    value: summary?.pending    ?? 0, color: 'text-yellow-600' },
              { label: 'Confirmed',  value: summary?.confirmed  ?? 0, color: 'text-blue-600'   },
              { label: 'Processing', value: summary?.processing ?? 0, color: 'text-purple-600' },
              { label: 'Completed',  value: summary?.completed  ?? 0, color: 'text-green-600'  },
              { label: 'Rejected',   value: summary?.rejected   ?? 0, color: 'text-red-600'    },
              { label: 'Failed',     value: summary?.failed     ?? 0, color: 'text-red-400'    },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center p-4 rounded-xl bg-gray-50">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{label}</p>
                <p className={`text-3xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {safePct(value, summary?.total_requests ?? 0)}
                </p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}