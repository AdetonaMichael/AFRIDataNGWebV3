'use client';

import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';

export default function PrivacyPage() {
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

      {/* Header */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[#555]">Last updated: May 3, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto prose prose-sm text-[#555] space-y-8">
          
          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">Introduction</h2>
            <p className="leading-relaxed">
              AFRIDataNG ("we", "us", "our", or "Company") operates the AFRIDataNG platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">1. Information Collection and Use</h2>
            <p className="leading-relaxed mb-4">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, postal address, date of birth, identification number</li>
              <li><strong>Device Data:</strong> Device type, operating system, unique identifiers, IP address, browser type</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, features used</li>
              <li><strong>Transaction Data:</strong> Purchase history, payment method information, transaction amounts</li>
              <li><strong>Location Data:</strong> City, state, and country information derived from IP address</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">2. Use of Data</h2>
            <p className="leading-relaxed mb-4">
              AFRIDataNG uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent, and address fraud and technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">3. Security of Data</h2>
            <p className="leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">4. Sharing of Data</h2>
            <p className="leading-relaxed mb-4">
              We do not sell, trade, or rent users' Personal Data to third parties. However, we may share data with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Service providers who assist us in operating our website and conducting our business</li>
              <li>Law enforcement agencies when required by law</li>
              <li>Financial institutions for payment processing</li>
              <li>Analytics providers to understand how you use our Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">5. Cookies</h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">6. Your Rights</h2>
            <p className="leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your Personal Data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>The right to access your Personal Data</li>
              <li>The right to correct inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict processing of your data</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">7. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our Service does not address anyone under the age of 18. We do not knowingly collect Personal Data from children under 18. If we become aware that we have collected Personal Data from a child under age 18, we take steps to delete such information and terminate the child's account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">8. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">9. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at adeyemijolaade1@gmail.com or visit our <Link href="/contact" className="text-[#aab9f8] hover:underline">Contact page</Link>.
            </p>
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
