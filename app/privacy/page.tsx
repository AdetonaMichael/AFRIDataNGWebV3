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
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">Data Safety Overview</h2>
            <p className="leading-relaxed mb-4">
              At AFRIDataNG, we are committed to protecting user data and maintaining the highest standards of privacy and security. This section explains how we collect, use, share, and protect your information in accordance with global data protection standards.
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Key Principles:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Transparency:</strong> We clearly disclose what data we collect and how we use it</li>
              <li><strong>Minimization:</strong> We only collect data that is necessary to provide our services</li>
              <li><strong>Security:</strong> We employ industry-standard encryption and security measures</li>
              <li><strong>Control:</strong> Users have the right to access, modify, and delete their personal data</li>
              <li><strong>Accountability:</strong> We are responsible for how we handle all user data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">Data Collection and Security</h2>
            <p className="leading-relaxed mb-4">
              We implement comprehensive security measures to protect your data from unauthorized access, alteration, disclosure, or destruction:
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Security Measures:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher</li>
              <li><strong>Secure Storage:</strong> Personal data is stored in encrypted databases with restricted access</li>
              <li><strong>Access Controls:</strong> Only authorized personnel with legitimate business needs can access user data</li>
              <li><strong>Regular Audits:</strong> We conduct regular security audits and penetration testing</li>
              <li><strong>Incident Response:</strong> We have procedures in place to detect and respond to security incidents</li>
              <li><strong>Data Minimization:</strong> We retain data only as long as necessary to provide services</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">1. Information Collection and Use</h2>
            <p className="leading-relaxed mb-4">
              We collect several different types of information for various purposes to provide and improve our Service to you. All data collection complies with applicable privacy laws and regulations.
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Personal Data:</strong> Name, email address, phone number, postal address, date of birth, identification number (collected only when you voluntarily provide it)</li>
              <li><strong>Device Data:</strong> Device type, operating system, unique identifiers, IP address, browser type (automatically collected for service optimization)</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, features used (collected through analytics tools)</li>
              <li><strong>Transaction Data:</strong> Purchase history, payment method information (last 4 digits only), transaction amounts (collected to provide payment services)</li>
              <li><strong>Location Data:</strong> City, state, and country information derived from IP address (used for localization and compliance)</li>
              <li><strong>Communication Data:</strong> Messages sent to customer support, feedback, and survey responses (collected with explicit consent)</li>
            </ul>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mt-4 mb-2">Data Collection Methods:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Direct Collection:</strong> Information you provide when creating an account or using our services</li>
              <li><strong>Automatic Collection:</strong> Data collected through cookies, local storage, and similar technologies</li>
              <li><strong>Third-Party Sources:</strong> Payment processors and analytics partners (see Sharing of Data section)</li>
              <li><strong>Ephemeral Processing:</strong> Data accessed and processed only in memory for real-time service requests</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">2. Use of Data</h2>
            <p className="leading-relaxed mb-4">
              AFRIDataNG uses the collected data for specific, legitimate purposes to provide and improve our services:
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Primary Purposes:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Service Delivery:</strong> Processing transactions, managing accounts, and providing customer support</li>
              <li><strong>Service Improvement:</strong> Analyzing usage patterns to enhance features and user experience</li>
              <li><strong>Communication:</strong> Sending service notifications, updates, and important account information</li>
              <li><strong>Fraud Prevention:</strong> Monitoring for fraudulent activities and protecting against unauthorized access</li>
              <li><strong>Legal Compliance:</strong> Meeting regulatory requirements and law enforcement requests</li>
              <li><strong>Analytics:</strong> Understanding how users interact with our platform (aggregated and anonymized)</li>
              <li><strong>Security:</strong> Detecting and preventing technical issues, malware, and security threats</li>
              <li><strong>Marketing:</strong> Sending promotional materials (only with explicit opt-in consent)</li>
            </ul>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mt-4 mb-2">Data Processing Practices:</h3>
            <p className="leading-relaxed mb-2">
              We process data only for the purposes stated above. Users can control their data usage preferences through account settings. We do not process data beyond what is necessary to provide our services.
            </p>
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
              We do not sell, trade, or rent users' Personal Data to third parties. However, we may share data with trusted partners who assist us in operating our platform and services:
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Authorized Data Sharing:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Service Providers:</strong> Payment processors, cloud hosting providers, and customer support platforms (data shared as necessary to provide services)</li>
              <li><strong>Financial Institutions:</strong> Banks and payment gateways for transaction processing (encrypted payment data only)</li>
              <li><strong>Analytics Providers:</strong> Third-party analytics services to understand platform usage (anonymized and aggregated data only)</li>
              <li><strong>Law Enforcement:</strong> Government agencies when required by law or valid legal process (with appropriate legal documentation)</li>
              <li><strong>Business Partners:</strong> Affiliated services and partners (with explicit user consent)</li>
            </ul>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mt-4 mb-2">Data Sharing Restrictions:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>All third-party partners are bound by confidentiality agreements</li>
              <li>Partners must comply with applicable privacy laws and regulations</li>
              <li>Data shared with third parties is limited to what is necessary for providing services</li>
              <li>We do not allow third parties to use your data for their own marketing purposes</li>
              <li>Users can request information about specific data sharing at any time</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">5. Tracking Technologies and Cookies</h2>
            <p className="leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience and understand how you use our Service. These technologies help us remember your preferences, improve functionality, and protect against fraud.
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Types of Tracking Technology:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Essential Cookies:</strong> Required for authentication and service functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand usage patterns and optimize performance</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and personalization choices</li>
              <li><strong>Advertising Cookies:</strong> Used only with explicit consent to deliver relevant content</li>
              <li><strong>Analytics Tracking:</strong> Google Analytics and similar services (anonymized data)</li>
            </ul>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mt-4 mb-2">User Control:</h3>
            <p className="leading-relaxed mb-2">
              You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, blocking all cookies may affect your ability to use certain features of our Service. You can also opt out of analytics tracking in your account settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">6. Your Rights and Data Subject Requests</h2>
            <p className="leading-relaxed mb-4">
              Depending on your location and applicable laws, you may have certain rights regarding your Personal Data. We are committed to respecting these rights:
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Your Data Rights:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Right to Access:</strong> You can request a copy of all personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> You can correct inaccurate or incomplete information</li>
              <li><strong>Right to Erasure:</strong> You can request deletion of your data (subject to legal obligations)</li>
              <li><strong>Right to Restrict Processing:</strong> You can limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> You can request your data in a machine-readable format</li>
              <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for data processing at any time</li>
              <li><strong>Right to Object:</strong> You can object to certain types of data processing</li>
              <li><strong>Right to Lodge a Complaint:</strong> You can file a complaint with your local data protection authority</li>
            </ul>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mt-4 mb-2">How to Exercise Your Rights:</h3>
            <p className="leading-relaxed mb-2">
              To exercise any of these rights, please contact us at adeyemijolaade1@gmail.com with a clear description of your request. We will respond within 30 days (or as required by law). You can also manage many of your preferences directly in your account settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">7. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our Service does not address anyone under the age of 18. We do not knowingly collect Personal Data from children under 18. If we become aware that we have collected Personal Data from a child under age 18, we take steps to delete such information and terminate the child's account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">7. Children's Privacy</h2>
            <p className="leading-relaxed mb-4">
              AFRIDataNG is not intended for users under the age of 18. We take children's privacy very seriously and comply with all applicable child protection laws.
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Our Commitment:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>We do not knowingly collect Personal Data from children under 18</li>
              <li>Our Service is not designed for or directed to children under 18</li>
              <li>If we become aware that we have collected data from a minor, we immediately delete such information</li>
              <li>We do not use children's data for marketing purposes</li>
              <li>If a parent or guardian believes we have collected data from their child, they can contact us immediately</li>
            </ul>
            <p className="leading-relaxed mt-4">
              If you believe we have collected data from a child, please contact us at adeyemijolaade1@gmail.com.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">8. Data Retention</h2>
            <p className="leading-relaxed mb-4">
              We retain personal data only for as long as necessary to provide our services and fulfill the purposes stated in this Privacy Policy.
            </p>
            <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">Retention Periods:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Account Data:</strong> Retained while your account is active, or for 2 years after account closure if necessary for compliance</li>
              <li><strong>Transaction Data:</strong> Retained for 7 years to comply with financial regulations</li>
              <li><strong>Analytics Data:</strong> Retained for up to 26 months; older data is automatically deleted</li>
              <li><strong>Support Data:</strong> Retained for 1 year after resolution of your request</li>
              <li><strong>Marketing Data:</strong> Retained only while consent is active</li>
            </ul>
            <p className="leading-relaxed mt-2">
              You can request deletion of your data at any time through your account settings or by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">9. International Data Transfers</h2>
            <p className="leading-relaxed mb-4">
              AFRIDataNG operates globally and may transfer your personal data to countries other than where you are located. When we transfer data internationally, we implement appropriate safeguards to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Standard contractual clauses approved by relevant authorities</li>
              <li>Privacy Shield frameworks or equivalent mechanisms</li>
              <li>Data protection impact assessments for high-risk transfers</li>
              <li>Encryption during transmission across borders</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">10. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">10. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. If changes are significant, we may provide additional notice or require your consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-4">11. Contact & Data Protection Officer</h2>
            <p className="leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, our data handling practices, or wish to exercise your data rights, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-[#0a0a0a] font-semibold mb-2">AFRIDataNG Data Protection Team</p>
              <p className="text-[#555]">Email: <a href="mailto:adeyemijolaade1@gmail.com" className="text-[#aab9f8] hover:underline">adeyemijolaade1@gmail.com</a></p>
              <p className="text-[#555] mt-2">Please include "Data Request" in your subject line for faster processing</p>
              <p className="text-[#555] mt-2">We aim to respond to all inquiries within 30 days</p>
            </div>
            <p className="leading-relaxed">
              You can also visit our <Link href="/contact" className="text-[#aab9f8] hover:underline">Contact page</Link> to submit a request through our contact form.
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
