'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  Gift,
  Share2,
  Users2,
  Wallet,
} from 'lucide-react';

import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Spinner } from '@/components/shared/Spinner';

type ReferralStatus = 'active' | 'pending';
type ReferralTier = 'silver' | 'gold' | 'platinum';

type RecentReferral = {
  id: string;
  name: string;
  email: string;
  date: string;
  status: ReferralStatus;
  earnings: number;
};

type TierBenefit = {
  tier: ReferralTier;
  min_referrals: number;
  commission: string;
};

type ReferralData = {
  code: string;
  link: string;
  total_referrals: number;
  active_referrals: number;
  total_earnings: number;
  pending_earnings: number;
  referral_tier: ReferralTier;
  recent_referrals: RecentReferral[];
  tier_benefits: TierBenefit[];
};

const mockReferralData: ReferralData = {
  code: 'AFRIDAT2024',
  link: 'https://afridatawebv3.com/ref/AFRIDAT2024',
  total_referrals: 28,
  active_referrals: 22,
  total_earnings: 45000,
  pending_earnings: 8500,
  referral_tier: 'gold',
  recent_referrals: [
    {
      id: '1',
      name: 'Chidi Okafor',
      email: 'chidi@example.com',
      date: '2024-01-23',
      status: 'active',
      earnings: 2000,
    },
    {
      id: '2',
      name: 'Amara Eze',
      email: 'amara@example.com',
      date: '2024-01-24',
      status: 'pending',
      earnings: 1500,
    },
    {
      id: '3',
      name: 'Tunde Adebayo',
      email: 'tunde@example.com',
      date: '2024-01-25',
      status: 'pending',
      earnings: 1200,
    },
  ],
  tier_benefits: [
    { tier: 'silver', min_referrals: 10, commission: '2%' },
    { tier: 'gold', min_referrals: 25, commission: '3%' },
    { tier: 'platinum', min_referrals: 50, commission: '5%' },
  ],
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getTierStyles(tier: ReferralTier, currentTier: ReferralTier) {
  const isCurrent = tier === currentTier;

  if (isCurrent) {
    return 'border-[#4a5ff7] bg-[#eef2ff] shadow-[0_10px_30px_rgba(74,95,247,0.10)]';
  }

  return 'border-[#e5e7eb] bg-white';
}

export default function ReferralPage() {
  const [referrals, setReferrals] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReferrals(mockReferralData);
    setLoading(false);
  }, []);

  const nextTier = useMemo(() => {
    if (!referrals) return null;

    return referrals.tier_benefits.find(
      (tier) => tier.min_referrals > referrals.total_referrals
    );
  }, [referrals]);

  const remainingToNextTier = useMemo(() => {
    if (!referrals || !nextTier) return 0;
    return Math.max(nextTier.min_referrals - referrals.total_referrals, 0);
  }, [referrals, nextTier]);

  const copyToClipboard = async () => {
    if (!referrals?.link) return;

    try {
      await navigator.clipboard.writeText(referrals.link);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy referral link:', error);
    }
  };

  if (loading || !referrals) {
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

        <div className="relative z-10 grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#c7d2fe]">
              Referral Program
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Earn more by inviting others
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#cbd5e1] sm:text-base">
              Share your referral link, grow your network, and earn commissions
              whenever your referrals actively use AFRIDataNG services.
            </p>

            <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                Your Referral Link
              </p>

              <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/90 break-all">
                  {referrals.link}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={copyToClipboard}
                    className="h-11 rounded-xl bg-[#4a5ff7] px-5 text-white hover:bg-[#3b4fe0]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Copy size={16} />
                      {copied ? 'Copied!' : 'Copy Link'}
                    </span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-xl border-white/15 bg-white/5 px-5 text-white hover:bg-white/10"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Share2 size={16} />
                      Share
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                Referral Code: <span className="font-bold">{referrals.code}</span>
              </div>

              <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white capitalize">
                Current Tier: <span className="font-bold">{referrals.referral_tier}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: 'Total Referrals',
                value: referrals.total_referrals,
                icon: Users2,
              },
              {
                label: 'Active Referrals',
                value: referrals.active_referrals,
                icon: CheckCircle2,
              },
              {
                label: 'Total Earnings',
                value: formatCurrency(referrals.total_earnings),
                icon: Wallet,
              },
              {
                label: 'Pending Earnings',
                value: formatCurrency(referrals.pending_earnings),
                icon: Gift,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">
                        {item.label}
                      </p>
                      <p className="mt-3 text-2xl font-bold tracking-tight text-white">
                        {item.value}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-3">
                      <Icon className="h-5 w-5 text-[#c7d2fe]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tier + Progress */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
                Referral Tiers
              </h2>
              <p className="mt-1 text-sm text-[#6b7280]">
                Unlock better commission rates as your referrals grow.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {referrals.tier_benefits.map((tier) => {
              const isCurrent = tier.tier === referrals.referral_tier;

              return (
                <div
                  key={tier.tier}
                  className={`rounded-[24px] border p-5 transition-all ${getTierStyles(
                    tier.tier,
                    referrals.referral_tier
                  )}`}
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold capitalize text-[#111827]">
                        {tier.tier}
                      </h3>
                      <p className="mt-1 text-sm text-[#6b7280]">
                        Commission structure
                      </p>
                    </div>

                    {isCurrent ? (
                      <Badge variant="success" size="sm">
                        Current
                      </Badge>
                    ) : null}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-[#f8fafc] p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                        Minimum Referrals
                      </p>
                      <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#111827]">
                        {tier.min_referrals}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f8fafc] p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
                        Commission Rate
                      </p>
                      <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#16a34a]">
                        {tier.commission}
                      </p>
                    </div>
                  </div>

                  {isCurrent ? (
                    <div className="mt-4 rounded-2xl border border-[#c7d2fe] bg-white/80 px-4 py-3 text-sm font-medium text-[#3650e6]">
                      You are currently on this tier. Keep growing to unlock more.
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <span className="inline-flex rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#4a5ff7]">
            Growth Insight
          </span>

          <h3 className="mt-4 text-xl font-bold tracking-tight text-[#111827]">
            Next Tier Progress
          </h3>

          {nextTier ? (
            <>
              <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                You need{' '}
                <span className="font-bold text-[#111827]">{remainingToNextTier}</span>{' '}
                more referral{remainingToNextTier === 1 ? '' : 's'} to reach{' '}
                <span className="font-bold capitalize text-[#111827]">{nextTier.tier}</span>{' '}
                and unlock a {nextTier.commission} commission rate.
              </p>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-[#6b7280]">Progress</span>
                  <span className="font-semibold text-[#111827]">
                    {referrals.total_referrals}/{nextTier.min_referrals}
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                  <div
                    className="h-full rounded-full bg-[#4a5ff7]"
                    style={{
                      width: `${Math.min(
                        (referrals.total_referrals / nextTier.min_referrals) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm leading-7 text-[#6b7280]">
              You are already at the highest referral tier available. Keep earning.
            </p>
          )}

          <div className="mt-8 rounded-[22px] border border-[#edf2f7] bg-[#fcfcfd] p-5">
            <h4 className="text-base font-bold text-[#111827]">Quick Suggestion</h4>
            <p className="mt-2 text-sm leading-7 text-[#6b7280]">
              Share your referral link with repeat buyers, agents, and people who
              regularly purchase airtime, data, and utility services.
            </p>
          </div>
        </Card>
      </section>

      {/* Recent Referrals */}
      <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
              Recent Referrals
            </h2>
            <p className="mt-1 text-sm text-[#6b7280]">
              Monitor recent signups and track the earnings they generate.
            </p>
          </div>

          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4a5ff7] hover:underline"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  Referred Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#6b7280]">
                  Earnings
                </th>
              </tr>
            </thead>

            <tbody>
              {referrals.recent_referrals.map((referral) => (
                <tr key={referral.id} className="rounded-2xl bg-[#fcfcfd]">
                  <td className="rounded-l-2xl border-y border-l border-[#edf2f7] px-4 py-4 text-sm font-semibold text-[#111827]">
                    {referral.name}
                  </td>
                  <td className="border-y border-[#edf2f7] px-4 py-4 text-sm text-[#6b7280]">
                    {referral.email}
                  </td>
                  <td className="border-y border-[#edf2f7] px-4 py-4 text-sm text-[#6b7280]">
                    {formatDate(referral.date)}
                  </td>
                  <td className="border-y border-[#edf2f7] px-4 py-4 text-sm">
                    <Badge
                      variant={referral.status === 'active' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {referral.status}
                    </Badge>
                  </td>
                  <td className="rounded-r-2xl border-y border-r border-[#edf2f7] px-4 py-4 text-sm font-bold text-[#16a34a]">
                    {formatCurrency(referral.earnings)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* How it works + Tips */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">
            How It Works
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            A simple process to start earning from every successful referral.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Share Your Link',
                description: 'Send your unique referral link to friends, customers, and your network.',
              },
              {
                step: '02',
                title: 'They Register',
                description: 'Your referral signs up and becomes an AFRIDataNG user.',
              },
              {
                step: '03',
                title: 'They Transact',
                description: 'They purchase airtime, data, or pay supported utility bills.',
              },
              {
                step: '04',
                title: 'You Earn',
                description: 'Your referral activity generates commission for you automatically.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[24px] border border-[#edf2f7] bg-[#fcfcfd] p-5"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4a5ff7] text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-base font-bold text-[#111827]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[28px] border border-[#dbe4ff] bg-[#f8faff] p-6 sm:p-7 shadow-[0_10px_35px_rgba(74,95,247,0.06)]">
          <span className="inline-flex rounded-full border border-[#c7d2fe] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#4a5ff7]">
            Best Practices
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111827]">
            Tips to Boost Your Earnings
          </h2>

          <div className="mt-6 space-y-4">
            {[
              'Share your referral link on your social media channels for wider reach.',
              'Target people who regularly buy data, airtime, and utility services.',
              'Move up referral tiers to unlock better commission percentages.',
              'Invite agents, resellers, and entrepreneurs with consistent transaction volume.',
            ].map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-3 rounded-2xl border border-[#e6ecff] bg-white p-4"
              >
                <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#4a5ff7]" />
                <p className="text-sm leading-7 text-[#4b5563]">{tip}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button className="h-11 rounded-xl bg-[#4a5ff7] px-6 text-white hover:bg-[#3b4fe0]">
              <span className="inline-flex items-center gap-2">
                Start Sharing
                <ArrowRight size={16} />
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}