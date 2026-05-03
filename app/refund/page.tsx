'use client';

import Link from 'next/link';
import Image from 'next/image';

const icon = '/icon.png';
import { CheckCircle, AlertCircle, Clock, HelpCircle } from 'lucide-react';

export default function RefundPage() {
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Refund Policy</h1>
          <p className="text-[#555]">Last updated: May 3, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">Overview</h2>
            <p className="text-[#555] leading-relaxed">
              At AFRIDataNG, we want you to be completely satisfied with our services. This Refund Policy outlines our approach to handling refunds for transactions conducted through our platform. We are committed to fair and transparent practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">1. Successful Transactions</h2>
            <p className="text-[#555] leading-relaxed mb-4">
              Once a transaction is marked as "Completed" on the AFRIDataNG platform, it is considered successful and the service has been delivered. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-[#555]">
              <li>Airtime credited to the specified network and phone number</li>
              <li>Data bundles activated on the user's account</li>
              <li>Electricity tokens generated and sent</li>
              <li>TV subscription renewed or activated</li>
              <li>Cash received from airtime conversion</li>
            </ul>
            <p className="text-[#555] leading-relaxed mt-4">
              Successful transactions are not eligible for refunds as the service has been rendered.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">2. Failed Transactions</h2>
            <p className="text-[#555] leading-relaxed mb-4">
              If a transaction fails before completion, we will automatically process a refund to your AFRIDataNG wallet. Failed transaction refunds typically appear within:
            </p>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 mb-4">
              <Clock size={24} className="text-[#aab9f8] flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#0a0a0a]">24-48 hours</p>
                <p className="text-sm text-[#555]">For wallet refunds from failed transactions</p>
              </div>
            </div>
            <p className="text-[#555] leading-relaxed">
              In rare cases where automatic refund doesn't process, contact our support team with transaction details for manual processing.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">3. Service Delivery Issues</h2>
            <p className="text-[#555] leading-relaxed mb-4">
              If you experience issues with service delivery (airtime not received, data not activated, etc.), please report it immediately:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle size={18} className="text-[#aab9f8]" />
                  Evidence Required
                </h3>
                <ul className="text-[#555] text-sm space-y-1 ml-6">
                  <li>• Transaction reference number</li>
                  <li>• Screenshots of the failed service</li>
                  <li>• Network provider communication (if available)</li>
                  <li>• Timestamp of the issue</li>
                </ul>
              </div>
            </div>
            <p className="text-[#555] leading-relaxed mt-4">
              After investigation, we will either arrange for service delivery or process a refund within 5-7 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">4. Duplicate Transactions</h2>
            <p className="text-[#555] leading-relaxed">
              If you are charged twice for the same service, we will refund the duplicate amount immediately upon verification. Please provide:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-[#555] mt-4">
              <li>Transaction reference numbers for both charges</li>
              <li>Screenshots showing the duplicate transactions</li>
              <li>Proof that you only received service once</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">5. Non-Refundable Items</h2>
            <p className="text-[#555] leading-relaxed mb-4">
              The following are non-refundable:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-[#555]">
              <li>Airtime or data sent to incorrect phone numbers (user error)</li>
              <li>Services delivered successfully to the correct destination</li>
              <li>Transactions cancelled by user after confirmation</li>
              <li>Platform service fees and transaction charges</li>
              <li>Services that were suspended due to user violations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">6. Refund Methods</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Wallet Credit',
                  desc: 'Most refunds are credited directly to your AFRIDataNG wallet for immediate reuse.',
                  icon: <CheckCircle size={20} />,
                },
                {
                  title: 'Original Payment Method',
                  desc: 'For original deposit refunds, we can return funds to your original payment method (may take 3-5 business days).',
                  icon: <CheckCircle size={20} />,
                },
                {
                  title: 'Bank Transfer',
                  desc: 'Large refunds can be processed via bank transfer with proper verification (5-7 business days).',
                  icon: <CheckCircle size={20} />,
                },
              ].map((method, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="text-[#aab9f8]">{method.icon}</div>
                    <h3 className="font-semibold text-[#0a0a0a]">{method.title}</h3>
                  </div>
                  <p className="text-[#555] text-sm ml-8">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">7. Refund Timeline</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[#555] text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-4 font-semibold">Refund Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4">Wallet Credit</td>
                    <td className="py-2 px-4">Immediate to 24 hours</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4">Original Payment Method</td>
                    <td className="py-2 px-4">3-5 business days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 px-4">Bank Transfer</td>
                    <td className="py-2 px-4">5-7 business days</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Manual Review</td>
                    <td className="py-2 px-4">Up to 14 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">8. How to Request a Refund</h2>
            <p className="text-[#555] leading-relaxed mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-2 text-[#555]">
              <li>Log into your AFRIDataNG account</li>
              <li>Go to Transaction History and locate the transaction</li>
              <li>Click "Report Issue" for the specific transaction</li>
              <li>Provide detailed information and supporting evidence</li>
              <li>Submit your refund request</li>
              <li>Our team will review and respond within 24-48 hours</li>
            </ol>
            <p className="text-[#555] leading-relaxed mt-4">
              Alternatively, contact our support team directly at adeyemijolaade1@gmail.com with your transaction details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">9. Disputes & Chargebacks</h2>
            <p className="text-[#555] leading-relaxed mb-4">
              If you file a dispute or chargeback with your bank without attempting to resolve the issue with us first:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-[#555]">
              <li>Your account may be suspended pending investigation</li>
              <li>We may pursue additional charges for processing fees</li>
              <li>Future transactions may be restricted</li>
            </ul>
            <p className="text-[#555] leading-relaxed mt-4">
              We always prefer to resolve issues directly with customers. Please contact us first.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">10. Contact Us</h2>
            <p className="text-[#555] leading-relaxed">
              For refund inquiries or to report issues, contact our support team:
            </p>
            <div className="mt-4 space-y-2 text-[#555]">
              <p><strong>Email:</strong> <a href="mailto:adeyemijolaade1@gmail.com" className="text-[#aab9f8] hover:underline">adeyemijolaade1@gmail.com</a></p>
              <p><strong>Phone:</strong> +234 (704) 263 6989 (Monday-Friday, 9am-6pm WAT)</p>
              <p><strong>Website:</strong> <Link href="/contact" className="text-[#aab9f8] hover:underline">Contact us</Link></p>
            </div>
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
