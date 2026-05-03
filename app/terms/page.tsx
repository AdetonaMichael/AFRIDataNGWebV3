'use client';

import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';

export default function TermsPage() {
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Terms of Service</h1>
          <p className="text-[#555]">Last updated: May 3, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto prose prose-sm text-[#555] space-y-8">
          
          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using the AFRIDataNG platform (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">2. Use License</h2>
            <p className="leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on AFRIDataNG's Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Violating any applicable laws or regulations related to access to or use of the Service</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">3. Account Registration</h2>
            <p className="leading-relaxed">
              To use our Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account information and password, and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">4. User Responsibilities</h2>
            <p className="leading-relaxed mb-4">
              You agree to use the Service only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the Service. Prohibited behavior includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Harassing or causing distress or inconvenience to any person</li>
              <li>Offending, insulting or intimidating others</li>
              <li>Disrupting the normal flow of dialogue within our platform</li>
              <li>Using automated tools to access the Service</li>
              <li>Engaging in any fraudulent or illegal activities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">5. Transactions</h2>
            <p className="leading-relaxed">
              AFRIDataNG acts as a platform to facilitate transactions between users and service providers. All transactions are subject to verification and may be cancelled or reversed if found to be fraudulent or non-compliant with our policies. We reserve the right to refuse any transaction at our discretion.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">6. Limitation of Liability</h2>
            <p className="leading-relaxed">
              The materials appearing on AFRIDataNG's Service could include technical, typographical, or photographic errors. AFRIDataNG does not warrant that any of the materials on its website are accurate, complete, or current. AFRIDataNG may make changes to the materials contained on its website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">7. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              The materials on AFRIDataNG's website are provided on an 'as is' basis. AFRIDataNG makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">8. Modifications</h2>
            <p className="leading-relaxed">
              AFRIDataNG may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">9. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the courts located in Nigeria.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">10. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at adeyemijolaade1@gmail.com or visit our <Link href="/contact" className="text-[#aab9f8] hover:underline">Contact page</Link>.
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
