'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Bolt,
  ChevronRight,
  CircleHelp,
  Play,
  ShieldCheck,
  Smartphone,
  Tv,
  Wallet,
  Wifi,
  Zap,
} from 'lucide-react';

const services = [
  {
    label: 'Airtime',
    desc: 'Recharge all major networks instantly with fast and reliable delivery.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    icon: Smartphone,
  },
  {
    label: 'Data Bundles',
    desc: 'Buy daily, weekly, and monthly plans across supported providers.',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    icon: Wifi,
  },
  {
    label: 'Electricity',
    desc: 'Purchase electricity tokens quickly across supported distribution companies.',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    icon: Zap,
  },
  {
    label: 'TV Subscription',
    desc: 'Renew DSTV, GOtv, and Startimes subscriptions in seconds.',
    image:
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
    icon: Tv,
  },
  {
    label: 'Airtime to Cash',
    desc: 'Convert unused airtime at competitive rates with a streamlined process.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    icon: Wallet,
  },
  {
    label: 'Bulk SMS',
    desc: 'Send messages at scale for customer engagement and outreach.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    icon: Bolt,
  },
];

const networks = ['MTN', 'Airtel', 'Glo', '9mobile'];

const stats = [
  { value: '500K+', label: 'Active Users' },
  { value: '₦2B+', label: 'Transactions Processed' },
  { value: '99.9%', label: 'Platform Uptime' },
  { value: '< 5s', label: 'Average Delivery Time' },
];

const steps = [
  {
    n: '01',
    title: 'Create Account',
    body: 'Sign up in minutes using your email address and phone number.',
  },
  {
    n: '02',
    title: 'Fund Your Wallet',
    body: 'Add funds through bank transfer, card, or supported payment options.',
  },
  {
    n: '03',
    title: 'Choose a Service',
    body: 'Select airtime, data, electricity, TV subscription, or any supported service.',
  },
  {
    n: '04',
    title: 'Complete Transaction',
    body: 'Your request is processed quickly, and delivery happens almost instantly.',
  },
];

const testimonials = [
  {
    name: 'Chidi O.',
    role: 'Business Owner, Lagos',
    text: 'I use AFRIDataNG almost every day for business operations. The speed is impressive and the experience feels dependable every time.',
  },
  {
    name: 'Amara B.',
    role: 'Freelancer, Abuja',
    text: 'The platform is clean, quick, and easy to trust. Wallet funding is smooth and the service delivery has been consistently fast.',
  },
  {
    name: 'Emeka R.',
    role: 'Student, Port Harcourt',
    text: 'What stood out to me first was how simple everything felt. Transactions complete fast and the interface is much cleaner than most alternatives.',
  },
];

const faqs = [
  {
    q: 'How fast is delivery?',
    a: 'Airtime and data are typically delivered within seconds. Electricity tokens and TV renewals are also processed very quickly in most cases.',
  },
  {
    q: 'What networks are supported?',
    a: 'We support MTN, Airtel, Glo, and 9mobile for airtime and data, alongside supported utility and TV subscription providers.',
  },
  {
    q: 'How do I fund my wallet?',
    a: 'You can fund your wallet through supported payment methods such as bank transfer and other integrated channels available on the platform.',
  },
  {
    q: 'Is my money safe?',
    a: 'Transactions are processed through secure systems and trusted payment infrastructure designed to protect account and transaction activity.',
  },
  {
    q: 'Can I convert airtime to cash?',
    a: 'Yes. The platform supports airtime-to-cash conversion across supported networks at competitive rates.',
  },
];

export default function Home() {
  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="bg-white text-[#0a0a0a]"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="h-16 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#4a5ff7]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="text-base font-bold tracking-tight text-[#0a0a0a]">
              AFRIDataNG
            </span>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            <a
              href="#services"
              className="text-sm font-medium text-[#555] transition-colors hover:text-[#0a0a0a]"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#555] transition-colors hover:text-[#0a0a0a]"
            >
              How it works
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-[#555] transition-colors hover:text-[#0a0a0a]"
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex items-center rounded-lg border border-[#d0d0d0] bg-transparent px-4 py-2 text-sm font-medium text-[#0a0a0a] transition-all hover:bg-gray-50"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center rounded-lg bg-[#0a0a0a] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#222]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="w-full px-4 py-14 sm:px-8 sm:py-20 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full border border-[#c7ccfb] bg-[#eef0fe] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4a5ff7]">
                Now Live in Nigeria
              </span>
              <span className="text-sm text-[#888]">Available 24/7 · All networks</span>
            </div>

            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-6xl">
              Fast digital services.
              <br />
              <span className="text-[#4a5ff7]">One clean platform.</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#555] sm:text-lg">
              Buy airtime, data bundles, electricity tokens, TV subscriptions,
              and more from one fast, reliable, and modern experience built for
              everyday use.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-lg bg-[#4a5ff7] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3a4fe0]"
              >
                Create Free Account
                <ArrowRight size={16} />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border border-[#d0d0d0] bg-transparent px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-all hover:bg-gray-50"
              >
                <Play size={15} />
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#aaa]">
                Supports
              </span>
              {networks.map((network) => (
                <span
                  key={network}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#333]"
                >
                  {network}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="relative overflow-hidden rounded-[28px] border border-[#101828] bg-[#0a0a0a] p-6 text-white sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4a5ff7] opacity-10" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#a9b7ff] opacity-[0.07]" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7c8db5]">
                      Wallet Balance
                    </div>
                    <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                      ₦12,500.00
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Wallet className="h-5 w-5 text-[#a9b7ff]" />
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Last Top-Up', value: '₦2,000' },
                    { label: 'Primary Network', value: 'MTN' },
                    { label: 'Data Balance', value: '3.2 GB' },
                    { label: 'Account Status', value: 'Active' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl bg-white/[0.06] px-4 py-3"
                    >
                      <div className="mb-1 text-[11px] font-medium text-[#74809b]">
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7c8db5]">
                    Quick Actions
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['Buy Airtime', 'Buy Data', 'Pay Bills'].map((action) => (
                      <span
                        key={action}
                        className="rounded-full border border-[#4a5ff7]/30 bg-[#4a5ff7]/15 px-3 py-1.5 text-xs font-semibold text-[#c7d2fe]"
                      >
                        {action}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-[#aeb8cf]">
                  <ShieldCheck size={15} />
                  Secure, fast, and always available.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-gray-100 bg-gray-50">
        <div className="grid w-full grid-cols-2 lg:grid-cols-4 px-4 sm:px-8 lg:px-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 py-8 text-center ${
                index < stats.length - 1 ? 'border-r border-gray-200' : ''
              }`}
            >
              <div className="mb-1 text-3xl font-extrabold tracking-tight text-[#0a0a0a] sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-[#888]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="w-full px-4 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="mb-12">
          <span className="mb-4 inline-block rounded-full border border-[#c7ccfb] bg-[#eef0fe] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4a5ff7]">
            Our Services
          </span>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#0a0a0a] sm:text-4xl">
            Everything you need, in one place.
          </h2>
          <p className="max-w-2xl text-base font-medium text-[#777]">
            Manage essential digital and utility services without switching apps
            or dealing with unreliable flows.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.label}
                className="group overflow-hidden rounded-[24px] border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#4a5ff7]/40 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
              >
                <div
                  className="relative h-48 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white">{service.label}</h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm leading-7 text-[#666]">{service.desc}</p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#111827]">
                      Explore service
                    </span>
                    <div className="rounded-full bg-[#eef2ff] p-2 transition-colors group-hover:bg-[#4a5ff7]">
                      <ChevronRight className="h-4 w-4 text-[#4a5ff7] group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="how-it-works"
        className="w-full border-t border-gray-100 bg-gray-50"
      >
        <div className="grid w-full grid-cols-1 items-start gap-12 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-16">
          <div>
            <span className="mb-4 inline-block rounded-full border border-[#c7ccfb] bg-[#eef0fe] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4a5ff7]">
              Process
            </span>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#0a0a0a] sm:text-4xl">
              Up and running in four steps.
            </h2>
            <p className="mb-8 max-w-xl text-base font-medium leading-relaxed text-[#777]">
              The experience is designed to be straightforward from signup to
              successful delivery.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#222]"
            >
              Start Now
              <ArrowRight size={16} />
            </Link>
          </div>

          <div>
            {steps.map((step, index) => (
              <div
                key={step.n}
                className={`flex items-start gap-5 py-6 ${
                  index < steps.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                    index === 0
                      ? 'bg-[#4a5ff7] text-white'
                      : 'bg-gray-200 text-[#888]'
                  }`}
                >
                  {step.n}
                </div>

                <div>
                  <div className="mb-1 text-sm font-bold text-[#0a0a0a]">
                    {step.title}
                  </div>
                  <div className="text-sm leading-relaxed text-[#777]">
                    {step.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-4 inline-block rounded-full border border-[#c7ccfb] bg-[#eef0fe] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4a5ff7]">
              Reviews
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0a0a] sm:text-4xl">
              Trusted by real people.
            </h2>
          </div>

          <div className="flex items-center gap-1">
            {'★★★★★'.split('').map((star, index) => (
              <span key={index} className="text-xl text-[#4a5ff7]">
                {star}
              </span>
            ))}
            <span className="ml-2 text-sm font-medium text-[#888]">4.9 / 5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-[24px] border border-gray-200 bg-[#fafafa] p-6 sm:p-7"
            >
              <p className="mb-6 text-sm leading-7 text-[#444]">
                “{testimonial.text}”
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4a5ff7] text-sm font-bold text-white">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0a0a0a]">
                    {testimonial.name}
                  </div>
                  <div className="text-xs font-medium text-[#aaa]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="w-full border-t border-gray-100 bg-gray-50">
        <div className="w-full px-4 py-16 sm:px-8 sm:py-24 lg:px-16">
          <span className="mb-4 inline-block rounded-full border border-[#c7ccfb] bg-[#eef0fe] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4a5ff7]">
            FAQ
          </span>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-[#0a0a0a] sm:text-4xl">
            Quick answers.
          </h2>

          <div className="max-w-3xl">
            {faqs.map((item, index) => (
              <div
                key={item.q}
                className={`py-5 ${
                  index === 0 ? 'border-y border-gray-200' : 'border-b border-gray-200'
                }`}
              >
                <div className="mb-2 flex items-start gap-3">
                  <CircleHelp className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4a5ff7]" />
                  <div className="text-sm font-bold text-[#0a0a0a]">{item.q}</div>
                </div>
                <div className="pl-7 text-sm leading-relaxed text-[#666]">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#4a5ff7] opacity-[0.07]" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#a9b7ff] opacity-[0.05]" />

        <div className="relative z-10 w-full px-4 py-16 text-center sm:px-8 sm:py-24 lg:px-16">
          <h2 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Stay connected.
            <br />
            <span className="text-[#a9b7ff]">Without the stress.</span>
          </h2>

          <p className="mx-auto mb-10 max-w-lg text-base font-medium leading-relaxed text-[#888]">
            Join thousands of users who rely on AFRIDataNG for essential digital
            and utility transactions every day.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-lg bg-[#4a5ff7] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#3a4fe0]"
            >
              Create Free Account
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center rounded-lg border border-[#333] bg-transparent px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/5"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-5 text-xs font-medium text-[#555]">
            No credit card required · Set up in minutes
          </p>
        </div>
      </section>

      <footer className="w-full border-t border-gray-100">
        <div className="w-full px-4 pb-8 pt-14 sm:px-8 lg:px-16">
          <div className="mb-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#4a5ff7]">
                  <span className="text-xs font-bold text-white">A</span>
                </div>
                <span className="text-sm font-bold tracking-tight text-[#0a0a0a]">
                  AFRIDataNG
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#888]">
                A fast, secure, and reliable platform for everyday digital top-up
                and utility payments.
              </p>
            </div>

            {[
              {
                title: 'Services',
                links: [
                  'Buy Airtime',
                  'Buy Data',
                  'Electricity',
                  'TV Subscription',
                  'Airtime to Cash',
                ],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact'],
              },
              {
                title: 'Legal',
                links: ['Terms of Service', 'Privacy Policy', 'Security', 'Refund Policy'],
              },
            ].map((column) => (
              <div key={column.title}>
                <div className="mb-4 text-xs font-bold uppercase tracking-widest text-[#0a0a0a]">
                  {column.title}
                </div>
                <ul className="flex list-none flex-col gap-2.5 p-0">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm font-medium text-[#888] no-underline transition-colors hover:text-[#0a0a0a]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 sm:flex-row">
            <p className="text-xs font-medium text-[#aaa]">
              © 2026 AFRIDataNG. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="text-sm font-medium text-[#888] no-underline transition-colors hover:text-[#0a0a0a]"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[#888] no-underline transition-colors hover:text-[#0a0a0a]"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm font-medium text-[#888] no-underline transition-colors hover:text-[#0a0a0a]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}