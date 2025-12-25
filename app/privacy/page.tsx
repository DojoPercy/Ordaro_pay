'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="text-[#0066FF] hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold font-heading text-slate-900 mb-8">Privacy Policy</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Ordaro Pay (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Company&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our payment processing service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Personal Information</h3>
                <p className="text-slate-600">
                  We collect information you provide directly, including name, email address, phone number, and payment information.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Automatically Collected Information</h3>
                <p className="text-slate-600">
                  We automatically collect certain information about your device and usage patterns, including IP address, browser type, and pages visited.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Payment Information</h3>
                <p className="text-slate-600">
                  Payment information is collected and processed by Paystack, our certified payment processor. We do not store full credit card details.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-slate-600">
              <li>• Process and fulfill payment transactions</li>
              <li>• Send transactional and promotional communications</li>
              <li>• Improve our services and user experience</li>
              <li>• Detect and prevent fraud</li>
              <li>• Comply with legal obligations</li>
              <li>• Analyze usage patterns and trends</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">4. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement industry-standard security measures including AES-256 encryption, SSL/TLS protocols, and regular security audits. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">5. Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              We retain personal information for as long as necessary to provide our services and comply with legal obligations. Payment records are retained for 7 years as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">6. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Under GDPR and similar regulations, you have the right to:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li>• Access your personal data</li>
              <li>• Correct inaccurate data</li>
              <li>• Request deletion of your data</li>
              <li>• Restrict processing of your data</li>
              <li>• Data portability</li>
              <li>• Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">7. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="text-slate-700">
                <strong>Email:</strong> privacy@ordaro.com<br />
                <strong>Address:</strong> Ordaro Inc., [Your Address]<br />
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">8. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">Last Updated: December 25, 2025</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
