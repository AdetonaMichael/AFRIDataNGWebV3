'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';
import { Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contacts = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      info: 'adeyemijolaade1@gmail.com',
      desc: 'We typically respond within 24 hours.',
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      info: '+234 (704) 264 6989',
      desc: 'Available Monday to Friday, 9am-6pm WAT',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Office',
      info: 'Ibadan, Nigeria',
      desc: 'Visit us or send mail to our office.',
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
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-lg sm:text-xl text-[#555] leading-relaxed">
            Have a question, suggestion, or just want to say hello? Contact us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {contacts.map((contact, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="text-[#aab9f8] mb-4">{contact.icon}</div>
                <h3 className="text-lg font-bold mb-2">{contact.title}</h3>
                <p className="text-lg font-semibold text-[#0a0a0a] mb-2">{contact.info}</p>
                <p className="text-[#555]">{contact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#aab9f8] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#aab9f8] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#aab9f8] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#aab9f8] focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            {submitted && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                ✓ Thank you! We'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0a0a0a] px-8 py-3 font-semibold text-white transition-all hover:bg-[#222]"
            >
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Quick Help</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Frequently Asked Questions', href: '/#faq' },
              { title: 'Privacy Policy', href: '/privacy' },
              { title: 'Terms of Service', href: '/terms' },
              { title: 'Refund Policy', href: '/refund' },
            ].map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="p-4 rounded-lg border border-gray-200 hover:border-[#aab9f8] transition-colors group flex items-center justify-between"
              >
                <span className="font-medium">{link.title}</span>
                <ArrowRight size={18} className="text-[#aab9f8] group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
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
