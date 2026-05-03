'use client';

import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';
import { ArrowRight, FileText, Shield, DollarSign, Scale } from 'lucide-react';

export default function LegalPage() {
  const legalDocs = [
    {
      icon: <Scale size={24} />,
      title: 'Terms of Service',
      desc: 'Our terms and conditions for using AFRIDataNG. Read our usage policies and user agreements.',
      href: '/terms',
      color: 'from-blue-50 to-blue-100',
    },
    {
      icon: <Shield size={24} />,
      title: 'Privacy Policy',
      desc: 'How we collect, use, and protect your personal information. Your privacy matters to us.',
      href: '/privacy',
      color: 'from-green-50 to-green-100',
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Refund Policy',
      desc: 'Our refund and compensation policy for transactions and services.',
      href: '/refund',
      color: 'from-purple-50 to-purple-100',
    },
    {
      icon: <Shield size={24} />,
      title: 'Security Policy',
      desc: 'Our commitment to security, encryption, and data protection measures.',
      href: '/security',
      color: 'from-red-50 to-red-100',
    },
  ];

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
              Legal Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Legal & Compliance
          </h1>
          <p className="text-lg sm:text-xl text-[#555] leading-relaxed">
            Transparency is important to us. Here you'll find all our legal documents, policies, and agreements. We're committed to protecting your rights and operating with integrity.
          </p>
        </div>
      </section>

      {/* Legal Documents */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Documentation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {legalDocs.map((doc, idx) => (
              <Link
                key={idx}
                href={doc.href}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-[#aab9f8] transition-all hover:shadow-md"
              >
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${doc.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <div className="text-[#aab9f8]">{doc.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#aab9f8] transition-colors flex items-center justify-between">
                  {doc.title}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-[#555]">{doc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Sections */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Your Rights & Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-[#0a0a0a]">Your Rights</h3>
              <ul className="space-y-3">
                {[
                  'Access your personal data anytime',
                  'Request corrections to inaccurate information',
                  'Request deletion of your data',
                  'Withdraw consent for data processing',
                  'File complaints about our practices',
                  'Get refunds for failed transactions',
                ].map((right, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight size={16} className="text-[#aab9f8] flex-shrink-0 mt-1" />
                    <span className="text-[#555]">{right}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-[#0a0a0a]">Your Responsibilities</h3>
              <ul className="space-y-3">
                {[
                  'Provide accurate account information',
                  'Keep your password secure',
                  'Notify us of unauthorized access',
                  'Use the platform lawfully',
                  'Respect other users',
                  'Report suspected fraud or abuse',
                ].map((responsibility, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight size={16} className="text-[#aab9f8] flex-shrink-0 mt-1" />
                    <span className="text-[#555]">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I know my data is safe?',
                a: 'We use bank-grade encryption and comply with international security standards. Read our Security Policy for details.',
              },
              {
                q: 'What happens to my data if I delete my account?',
                a: 'We securely delete your personal data, but may retain transaction records for legal and compliance purposes.',
              },
              {
                q: 'Can I request all my data?',
                a: 'Yes! You can request a complete copy of your personal data by contacting our support team. We will provide it in a commonly used format within 30 days.',
              },
              {
                q: 'How are disputes handled?',
                a: 'We investigate all disputes thoroughly. Contact us immediately if you have concerns about a transaction.',
              },
              {
                q: 'Are there any hidden fees?',
                a: 'No. All fees are clearly displayed before you complete any transaction.',
              },
              {
                q: 'Where are your data centers located?',
                a: 'Our infrastructure is distributed across secure, certified data centers in multiple regions for redundancy and reliability.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-gray-100 hover:border-[#aab9f8] transition-colors">
                <h3 className="font-bold text-[#0a0a0a] mb-2">{item.q}</h3>
                <p className="text-[#555]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Have Legal Questions?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Our compliance team is here to help. Contact us if you have any concerns or need clarification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:legal@afridatang.com"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#aab9f8] font-semibold text-[#0a0a0a] transition-all hover:bg-white"
            >
              Email Legal Team
              <ArrowRight size={18} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-gray-400 font-semibold transition-all hover:border-white"
            >
              Contact Support
              <ArrowRight size={18} />
            </Link>
          </div>
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
