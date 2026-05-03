'use client';

import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';
import { ArrowRight, CheckCircle, Users, Target, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="bg-white text-[#0a0a0a]"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="h-16 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={icon} alt="AFRIDataNG Logo" width={32} height={32} />
            <span className="text-base font-bold tracking-tight text-[#0a0a0a]">
              AFRIDataNG
            </span>
          </Link>

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

      {/* Hero Section */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#aab9f8] text-sm font-semibold">
              About AFRIDataNG
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transforming Digital Payments in Africa
          </h1>
          <p className="text-lg sm:text-xl text-[#555] leading-relaxed">
            AFRIDataNG is dedicated to making digital services accessible, affordable, and instant for every African. We believe everyone deserves seamless access to airtime, data, utilities, and financial services.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-[#555] leading-relaxed mb-8">
              To empower millions of Africans by providing fast, reliable, and affordable digital services that simplify everyday transactions and unlock economic opportunities.
            </p>
            <ul className="space-y-4">
              {['Speed & Reliability', 'Affordability', 'Security', 'Accessibility'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-[#aab9f8] flex-shrink-0" />
                  <span className="text-[#555]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 flex items-center justify-center h-96">
            <Target size={120} className="text-[#aab9f8] opacity-30" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Why Choose AFRIDataNG</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ArrowRight size={24} />,
                title: 'Lightning Fast',
                desc: 'Most transactions complete within seconds with our optimized infrastructure.',
              },
              {
                icon: <Award size={24} />,
                title: 'Trusted & Secure',
                desc: 'Bank-grade security protects your account and every transaction.',
              },
              {
                icon: <Users size={24} />,
                title: 'Community First',
                desc: 'Built with African users in mind, for African needs.',
              },
              {
                icon: <CheckCircle size={24} />,
                title: '99.9% Uptime',
                desc: 'Reliable service you can depend on, always available when you need it.',
              },
              {
                icon: <Award size={24} />,
                title: 'Best Rates',
                desc: 'Competitive pricing ensures you get the most value for every transaction.',
              },
              {
                icon: <ArrowRight size={24} />,
                title: '24/7 Support',
                desc: 'Our team is always ready to help with any questions or concerns.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-gray-100 hover:border-[#aab9f8] transition-colors group">
                <div className="text-[#aab9f8] mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-[#555]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '500K+', label: 'Active Users' },
            { value: '₦2B+', label: 'Transactions' },
            { value: '99.9%', label: 'Uptime' },
            { value: '< 5s', label: 'Avg Speed' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-[#555]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="space-y-8">
            {[
              {
                title: 'Integrity',
                desc: 'We operate with transparency and honesty in all our dealings, building trust with our users and partners.',
              },
              {
                title: 'Innovation',
                desc: 'We continuously improve and adapt to serve African needs better, embracing new technologies and approaches.',
              },
              {
                title: 'Excellence',
                desc: 'We strive for the highest quality in everything we do, from service delivery to customer support.',
              },
              {
                title: 'Inclusivity',
                desc: 'We believe digital services should be accessible to everyone, regardless of background or location.',
              },
            ].map((value, idx) => (
              <div key={idx} className="pb-8 border-b border-gray-100 last:border-b-0">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-[#555] text-lg">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto bg-[#0a0a0a] rounded-3xl p-12 sm:p-16 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of Africans experiencing the future of digital payments.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-lg bg-[#aab9f8] px-8 py-3 font-semibold text-[#0a0a0a] transition-all hover:bg-white"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 px-4 sm:px-8 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src={icon} alt="AFRIDataNG Logo" width={24} height={24} />
                <span className="font-bold">AFRIDataNG</span>
              </div>
              <p className="text-[#555] text-sm">Transforming digital payments in Africa.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#555]">
                <li><Link href="/about" className="hover:text-[#0a0a0a]">About</Link></li>
                {/* <li><Link href="/careers" className="hover:text-[#0a0a0a]">Careers</Link></li> */}
                <li><Link href="/contact" className="hover:text-[#0a0a0a]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#555]">
                <li><Link href="/legal" className="hover:text-[#0a0a0a]">Legal Center</Link></li>
                <li><Link href="/terms" className="hover:text-[#0a0a0a]">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-[#0a0a0a]">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[#555]">
                <li><Link href="/security" className="hover:text-[#0a0a0a]">Security</Link></li>
                <li><Link href="/refund" className="hover:text-[#0a0a0a]">Refund Policy</Link></li>
                <li><a href="mailto:adeyemijolaade1@gmail.com" className="hover:text-[#0a0a0a]">Email Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-[#555]">
            <p>&copy; 2024 AFRIDataNG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
