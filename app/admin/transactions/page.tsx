'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Spinner } from '@/components/shared/Spinner';
import { Badge } from '@/components/shared/Badge';
import { Input } from '@/components/shared/Input';
import { Search } from 'lucide-react';

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Mock data - replace with API call
    setTransactions([
      {
        id: 'TXN001',
        user: 'John Doe',
        type: 'airtime',
        provider: 'MTN',
        amount: 5000,
        status: 'completed',
        date: '2024-01-25 14:30',
      },
      {
        id: 'TXN002',
        user: 'Jane Smith',
        type: 'data',
        provider: 'Airtel',
        amount: 2500,
        status: 'completed',
        date: '2024-01-25 13:45',
      },
      {
        id: 'TXN003',
        user: 'Mike Johnson',
        type: 'bills',
        provider: 'NEPA',
        amount: 25000,
        status: 'pending',
        date: '2024-01-25 12:15',
      },
      {
        id: 'TXN004',
        user: 'Sarah Williams',
        type: 'airtime',
        provider: 'Glo',
        amount: 1000,
        status: 'failed',
        date: '2024-01-24 11:30',
      },
    ]);
    setLoading(false);
  }, []);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.provider.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'danger';
      default:
        return 'info';
    }
  };

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
        <h1 className="text-4xl font-bold text-gray-900">Transaction Management</h1>
        <p className="text-gray-600 mt-2">Monitor and manage all platform transactions</p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              label="Search"
              placeholder="Search by transaction ID, user, or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a9b7ff]"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.user}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f0f2ff] text-[#8a96ff]">
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{txn.provider}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₦{txn.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={getStatusVariant(txn.status)} size="sm">
                      {txn.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-[#a9b7ff] hover:text-[#9da9ff] font-medium">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </Card>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
        <div className="space-x-2">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}
