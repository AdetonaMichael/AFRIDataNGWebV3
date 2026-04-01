'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/shared/Card';
import { Spinner } from '@/components/shared/Spinner';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);

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
    });
    setLoading(false);
  }, []);

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
        <h1 className="text-4xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Real-time platform analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            label: 'Daily Revenue',
            value: `₦${metrics.daily_revenue.value.toLocaleString()}`,
            change: metrics.daily_revenue.change,
            trend: metrics.daily_revenue.trend,
          },
          {
            label: 'Daily Transactions',
            value: metrics.daily_transactions.value.toString(),
            change: metrics.daily_transactions.change,
            trend: metrics.daily_transactions.trend,
          },
          {
            label: 'Success Rate',
            value: metrics.success_rate.value,
            change: metrics.success_rate.change,
            trend: metrics.success_rate.trend,
          },
          {
            label: 'Active Users',
            value: metrics.active_users.value.toString(),
            change: metrics.active_users.change,
            trend: metrics.active_users.trend,
          },
          {
            label: 'New Users (Today)',
            value: metrics.new_users.value.toString(),
            change: metrics.new_users.change,
            trend: metrics.new_users.trend,
          },
          {
            label: 'Avg Transaction Value',
            value: `₦${metrics.avg_transaction_value.value.toLocaleString()}`,
            change: metrics.avg_transaction_value.change,
            trend: metrics.avg_transaction_value.trend,
          },
        ].map((metric) => (
          <Card key={metric.label}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
              </div>
              {metric.trend === 'up' ? (
                <TrendingUp className="text-green-500" size={24} />
              ) : (
                <TrendingDown className="text-red-500" size={24} />
              )}
            </div>
            <p
              className={`text-sm mt-2 font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {metric.change}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Revenue Trend (Last 7 Days)</h2>
          <div className="space-y-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 w-10">{day}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#a9b7ff] h-2 rounded-full"
                    style={{ width: (60 + Math.random() * 40) + '%' }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ₦{(Math.floor(Math.random() * 500000) + 1500000).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Breakdown</h2>
          <div className="space-y-4">
            {[
              { name: 'Airtime', percentage: 45, color: 'bg-[#a9b7ff]' },
              { name: 'Data', percentage: 35, color: 'bg-green-500' },
              { name: 'Bills', percentage: 15, color: 'bg-purple-500' },
              { name: 'Other', percentage: 5, color: 'bg-gray-500' },
            ].map((service) => (
              <div key={service.name} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600 w-20">{service.name}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className={`${service.color} h-3 rounded-full`}
                    style={{ width: service.percentage + '%' }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                  {service.percentage}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Provider</h2>
          <div className="bg-gradient-to-br from-[#f7f8ff] to-[#f0f2ff] rounded-lg p-6">
            <p className="text-gray-600 text-sm font-medium">Provider</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.top_provider.name}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-gray-600 text-sm">Transactions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.top_provider.transactions}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₦{(metrics.top_provider.revenue / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Service</h2>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <p className="text-gray-600 text-sm font-medium">Service</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.top_service.name}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-gray-600 text-sm">Market Share</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metrics.top_service.percentage}%</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₦{(metrics.top_service.revenue / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
