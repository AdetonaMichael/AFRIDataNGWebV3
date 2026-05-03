'use client';

import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';
import { ArrowRight, MapPin, Briefcase, Users, TrendingUp } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    {
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      desc: 'Build scalable payment infrastructure for millions of users across Africa.',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      desc: 'Shape the future of digital payments by defining our product roadmap.',
    },
    {
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Abuja, Nigeria',
      type: 'Full-time',
      desc: 'Drive data-driven decisions that impact millions of transactions daily.',
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      desc: 'Be the voice of AFRIDataNG, supporting our growing user base.',
    },
    {
      title: 'Mobile Developer (React Native)',
      department: 'Engineering',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      desc: 'Create amazing mobile experiences for our users on iOS and Android.',
    },
    {
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      desc: 'Ensure our platform runs smoothly with 99.9% uptime.',
    },
  ];

  const benefits = [
    { icon: <TrendingUp size={24} />, title: 'Growth Opportunities', desc: 'Learn and grow with a fast-moving fintech company.' },
    { icon: <Briefcase size={24} />, title: 'Competitive Salary', desc: 'Industry-leading compensation packages.' },
    { icon: <Users size={24} />, title: 'Great Team', desc: 'Work with talented, passionate individuals.' },
    { icon: <MapPin size={24} />, title: 'Flexible Work', desc: 'Remote options and flexible schedules.' },
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
              Join Our Team
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Help Us Transform Africa's Digital Future
          </h1>
          <p className="text-lg sm:text-xl text-[#555] leading-relaxed">
            We're building the future of digital payments in Africa. Join a team of passionate innovators making a real impact.
          </p>
        </div>
      </section>

      {/* Why AFRIDataNG */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Why Work at AFRIDataNG</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="text-[#aab9f8] mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-[#555]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-gray-100 hover:border-[#aab9f8] transition-all hover:shadow-md group cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#aab9f8] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-[#555] text-sm mb-4">{job.desc}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-[#555]">
                      <span className="flex items-center gap-1">
                        <Briefcase size={16} /> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={16} /> {job.location}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-blue-50 text-[#aab9f8] text-xs font-semibold">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-[#aab9f8] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Our Culture</h2>
          <div className="space-y-6">
            <p className="text-lg text-[#555] leading-relaxed">
              At AFRIDataNG, we believe that great products come from great teams. We foster a culture of innovation, collaboration, and continuous learning. Our team members are empowered to take ownership, experiment, and drive meaningful change.
            </p>
            <p className="text-lg text-[#555] leading-relaxed">
              We celebrate diversity and inclusion, believing that different perspectives lead to better solutions. We're committed to creating an inclusive workplace where everyone can thrive and contribute their best work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-lg text-gray-300 mb-8">
            We're always looking for talented people. Send us your resume and tell us how you can contribute to our mission.
          </p>
          <a
            href="mailto:careers@afridatang.com"
            className="inline-flex items-center gap-2 rounded-lg bg-[#aab9f8] px-8 py-3 font-semibold text-[#0a0a0a] transition-all hover:bg-white"
          >
            Send Your Resume
            <ArrowRight size={18} />
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
