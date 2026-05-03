'use client';

import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';
import { Shield, Lock, Eye, Zap, CheckCircle, AlertCircle } from 'lucide-react';

export default function SecurityPage() {
  const securityMeasures = [
    {
      icon: <Lock size={24} />,
      title: 'End-to-End Encryption',
      desc: 'All sensitive data is encrypted in transit and at rest using AES-256 encryption.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Security Certifications',
      desc: 'We comply with PCI DSS, ISO 27001, and other international security standards.',
    },
    {
      icon: <Eye size={24} />,
      title: 'Two-Factor Authentication',
      desc: 'Protect your account with optional two-factor authentication for added security.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-Time Monitoring',
      desc: 'Our security team monitors transactions 24/7 to detect and prevent fraud.',
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Regular Audits',
      desc: 'We conduct regular security audits and penetration testing to identify vulnerabilities.',
    },
    {
      icon: <AlertCircle size={24} />,
      title: 'Incident Response',
      desc: 'Dedicated team to respond to any security incidents within minutes.',
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
              Security First
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Security is Our Priority
          </h1>
          <p className="text-lg sm:text-xl text-[#555] leading-relaxed">
            We employ industry-leading security measures to protect your data and transactions. Learn how we keep your information safe.
          </p>
        </div>
      </section>

      {/* Security Measures */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Security Measures</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityMeasures.map((measure, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="text-[#aab9f8] mb-4">{measure.icon}</div>
                <h3 className="text-lg font-bold mb-2">{measure.title}</h3>
                <p className="text-[#555]">{measure.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Infrastructure Security</h2>
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-100">
              <h3 className="text-xl font-bold mb-2">Data Centers</h3>
              <p className="text-[#555]">
                Our infrastructure is hosted on secure, redundant servers with automatic failover and backup systems. We maintain data centers in multiple geographic locations to ensure 99.9% uptime.
              </p>
            </div>
            <div className="pb-6 border-b border-gray-100">
              <h3 className="text-xl font-bold mb-2">Network Security</h3>
              <p className="text-[#555]">
                We employ firewalls, intrusion detection systems, and DDoS protection to safeguard our infrastructure. All network traffic is monitored in real-time for suspicious activity.
              </p>
            </div>
            <div className="pb-6 border-b border-gray-100">
              <h3 className="text-xl font-bold mb-2">Access Control</h3>
              <p className="text-[#555]">
                Strict access controls ensure that only authorized personnel can access sensitive systems and data. All access is logged and regularly audited.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Backup & Disaster Recovery</h3>
              <p className="text-[#555]">
                We maintain regular backups of all critical data with encrypted storage. Our disaster recovery plan ensures minimal disruption in case of emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Your Security Best Practices</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                title: 'Strong Password',
                items: ['Use 12+ characters', 'Mix uppercase, lowercase, numbers, symbols', 'Never share your password'],
              },
              {
                title: 'Account Protection',
                items: ['Enable two-factor authentication', 'Keep your email secure', 'Log out on shared devices'],
              },
              {
                title: 'Safe Transactions',
                items: ['Verify recipient details', 'Use official AFRIDataNG channels', 'Don\'t share OTP with anyone'],
              },
              {
                title: 'Device Security',
                items: ['Keep software updated', 'Use antivirus protection', 'Be cautious with public WiFi'],
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#555]">
                      <CheckCircle size={16} className="text-[#aab9f8] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Compliance & Standards</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { title: 'PCI DSS', desc: 'Payment Card Industry Data Security Standard compliant' },
              { title: 'ISO 27001', desc: 'International information security management certified' },
              { title: 'Data Protection Laws', desc: 'Compliant with Nigerian data protection regulations' },
              { title: 'Financial Regulations', desc: 'Operating under proper financial service licenses' },
            ].map((comp, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-gray-100 bg-gray-50">
                <h3 className="font-bold mb-2">{comp.title}</h3>
                <p className="text-[#555] text-sm">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Vulnerability */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Report a Vulnerability</h2>
          <p className="text-lg text-gray-300 mb-8">
            If you discover a security vulnerability, please report it responsibly to our security team. We appreciate your help in keeping AFRIDataNG secure.
          </p>
          <a
            href="mailto:security@afridatang.com"
            className="inline-block px-8 py-3 rounded-lg bg-[#aab9f8] font-semibold text-[#0a0a0a] hover:bg-white transition-all"
          >
            Report Security Issue
          </a>
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
