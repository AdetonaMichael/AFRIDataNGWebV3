'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Search,
  ShieldCheck,
  UserCheck,
  UserMinus,
  Users2,
} from 'lucide-react';

import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Spinner } from '@/components/shared/Spinner';
import { Badge } from '@/components/shared/Badge';
import { Input } from '@/components/shared/Input';

type UserStatus = 'active' | 'suspended' | 'inactive';

type AdminUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: UserStatus;
  created_at: string;
  transactions: number;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getStatusVariant(status: UserStatus) {
  if (status === 'active') return 'success';
  if (status === 'suspended') return 'danger';
  return 'warning';
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all');

  useEffect(() => {
    setUsers([
      {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+234801234567',
        status: 'active',
        created_at: '2024-01-15',
        transactions: 25,
      },
      {
        id: '2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        phone: '+234802345678',
        status: 'active',
        created_at: '2024-01-20',
        transactions: 12,
      },
      {
        id: '3',
        first_name: 'Mike',
        last_name: 'Johnson',
        email: 'mike@example.com',
        phone: '+234803456789',
        status: 'suspended',
        created_at: '2024-02-01',
        transactions: 5,
      },
      {
        id: '4',
        first_name: 'Ruth',
        last_name: 'Adams',
        email: 'ruth@example.com',
        phone: '+234804123456',
        status: 'inactive',
        created_at: '2024-02-07',
        transactions: 0,
      },
    ]);

    setLoading(false);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        fullName.includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.includes(searchTerm);

      const matchesStatus =
        statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  const summary = useMemo(() => {
    const active = users.filter((user) => user.status === 'active').length;
    const suspended = users.filter((user) => user.status === 'suspended').length;
    const inactive = users.filter((user) => user.status === 'inactive').length;

    return {
      total: users.length,
      active,
      suspended,
      inactive,
    };
  }, [users]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2ff]">
            <Spinner />
          </div>
          <p className="text-sm font-medium text-[#6b7280]">
            Loading users...
          </p>
        </div>
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
              Admin User Management
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              User Management
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#cbd5e1] sm:text-base">
              Monitor user accounts, filter statuses, review account activity,
              and manage customer access from one admin control surface.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Total Users
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {summary.total}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Active Users
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {summary.active}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                Suspended
              </p>
              <p className="mt-3 text-2xl font-bold text-white">
                {summary.suspended}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: 'All Users',
            value: summary.total,
            note: 'Registered user accounts',
            icon: Users2,
          },
          {
            title: 'Active Accounts',
            value: summary.active,
            note: 'Users currently active',
            icon: UserCheck,
          },
          {
            title: 'Suspended Accounts',
            value: summary.suspended,
            note: 'Restricted user accounts',
            icon: ShieldCheck,
          },
          {
            title: 'Inactive Accounts',
            value: summary.inactive,
            note: 'Dormant or unused accounts',
            icon: UserMinus,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#6b7280]">{item.title}</p>
                  <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#111827]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-[#6b7280]">{item.note}</p>
                </div>

                <div className="rounded-2xl bg-[#eef2ff] p-3">
                  <Icon className="h-5 w-5 text-[#4a5ff7]" />
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Filters */}
      <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
        <div className="mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
            Filters
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Search by name, email, or phone and narrow results by account status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              size={18}
            />
            <Input
              label="Search"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
              Status Filter
            </label>
            <div className="relative">
              <Filter
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                size={18}
              />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as 'all' | UserStatus)
                }
                className="h-11 w-full rounded-xl border border-[#d1d5db] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none transition focus:border-[#4a5ff7] focus:ring-4 focus:ring-[#4a5ff7]/10"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <div className="flex h-11 w-full items-center rounded-xl border border-[#e5e7eb] bg-[#fafafa] px-4 text-sm font-medium text-[#6b7280]">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-white p-0 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
        <div className="border-b border-[#f1f5f9] px-6 py-5">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
            User Records
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Review account information, status, and user activity.
          </p>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eef2ff]">
              <Users2 className="h-8 w-8 text-[#4a5ff7]" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-[#111827]">
              No users found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#6b7280]">
              No users match your current search or filter criteria.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto xl:block">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-[#f1f5f9] bg-[#fcfcfd]">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Transactions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Joined
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#f8fafc] transition-colors hover:bg-[#fafafa]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-bold text-[#4a5ff7]">
                            {user.first_name.charAt(0)}
                            {user.last_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-xs text-[#9ca3af]">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6b7280]">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6b7280]">
                        {user.phone}
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          variant={getStatusVariant(user.status) as any}
                          size="sm"
                        >
                          {user.status}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#111827]">
                        {user.transactions}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#6b7280]">
                        {formatDate(user.created_at)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5ff7] hover:underline"
                        >
                          <Eye size={15} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-4 p-4 xl:hidden">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-[22px] border border-[#edf2f7] bg-[#fcfcfd] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-bold text-[#4a5ff7]">
                        {user.first_name.charAt(0)}
                        {user.last_name.charAt(0)}
                      </div>

                      <div>
                        <p className="text-base font-bold text-[#111827]">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-[#6b7280]">{user.email}</p>
                      </div>
                    </div>

                    <Badge
                      variant={getStatusVariant(user.status) as any}
                      size="sm"
                    >
                      {user.status}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                        Phone
                      </p>
                      <p className="mt-1 text-sm text-[#111827]">{user.phone}</p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                        Transactions
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#111827]">
                        {user.transactions}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
                        Joined
                      </p>
                      <p className="mt-1 text-sm text-[#111827]">
                        {formatDate(user.created_at)}
                      </p>
                    </div>

                    <div className="flex items-end justify-end">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5ff7] hover:underline"
                      >
                        <Eye size={15} />
                        View
                      </Link>
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
          Showing{' '}
          <span className="font-semibold text-[#111827]">
            {filteredUsers.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-[#111827]">{users.length}</span>{' '}
          users
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl border-[#d1d5db] px-4">
            <ChevronLeft size={16} />
            Previous
          </Button>

          <div className="rounded-xl bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#111827]">
            1
          </div>

          <Button variant="outline" className="h-11 rounded-xl border-[#d1d5db] px-4">
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}