import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, Home, Mail, ShieldCheck, FileText, Lock } from 'lucide-react';
import '@/styles/fonts.css';
import '@/styles/globals.css';

export const metadata = {
  title: '404 - Page Not Found | Ordaro Pay',
  description: 'The page you are looking for does not exist. Ordaro Pay - Secure payment processing for restaurants.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0066FF" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="font-barlow bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-slate-900 antialiased">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-xl border border-indigo-100 p-8 md:p-12">
              {/* Error Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-12 h-12 text-amber-600" />
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-center text-slate-900 mb-4">
                404
              </h1>

              {/* Subheading */}
              <h2 className="text-2xl font-bold font-heading text-center text-slate-700 mb-4">
                Page Not Found
              </h2>

              {/* Description */}
              <p className="text-center text-slate-600 mb-8 leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. This could be due to an invalid payment link, expired order, or incorrect URL.
              </p>

              {/* About Ordaro Pay */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold font-heading text-slate-900 mb-3">About Ordaro Pay</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Ordaro Pay is a secure, fast, and reliable payment processing service designed for restaurants and food service businesses. We provide seamless QR code-based payment solutions integrated with Paystack to ensure smooth transactions for your customers.
                </p>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066FF] font-bold">✓</span>
                    <span><strong>Secure Payments:</strong> AES-256 encryption and PCI compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066FF] font-bold">✓</span>
                    <span><strong>Fast Processing:</strong> Real-time payment verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0066FF] font-bold">✓</span>
                    <span><strong>Mobile Optimized:</strong> Works seamlessly on all devices</span>
                  </li>
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold font-heading text-slate-900 mb-4">Trusted & Secure</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {/* Paystack Badge */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
                    <Image
                      src="/paystack-logo.svg"
                      alt="Paystack"
                      width={64}
                      height={24}
                      className="mx-auto mb-1"
                    />
                    <p className="text-xs text-slate-600 font-semibold">Certified</p>
                  </div>

                  {/* PCI DSS Badge */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
                    <ShieldCheck className="w-5 h-5 text-[#0066FF] mx-auto mb-1" />
                    <p className="text-xs font-bold text-[#0066FF]">PCI DSS</p>
                    <p className="text-xs text-slate-600">Level 1</p>
                  </div>

                  {/* GDPR Badge */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
                    <FileText className="w-5 h-5 text-[#0066FF] mx-auto mb-1" />
                    <p className="text-xs font-bold text-[#0066FF]">GDPR</p>
                    <p className="text-xs text-slate-600">Compliant</p>
                  </div>

                  {/* SSL Badge */}
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 text-center">
                    <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-emerald-600">SSL</p>
                    <p className="text-xs text-slate-600">256-bit</p>
                  </div>
                </div>
              </div>

              {/* Legal & Compliance */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold font-heading text-slate-900 mb-3">Legal & Compliance</h3>
                <p className="text-xs text-slate-600 mb-3">
                  Ordaro Pay operates under strict compliance with international payment regulations including PCI DSS, GDPR, and local data protection laws. All transactions are encrypted and processed securely through Paystack, a certified payment processor.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-bold">✓</span> PCI DSS Compliant
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-bold">✓</span> GDPR Compliant
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-bold">✓</span> SSL Encrypted
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-bold">✓</span> Data Protected
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-bold">✓</span> Fraud Prevention
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-bold">✓</span> Secure Webhooks
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0066FF] to-indigo-600 hover:shadow-lg text-white font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
                <a
                  href="mailto:support@ordaro.com"
                  className="flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-[#0066FF] text-slate-700 hover:text-[#0066FF] font-semibold py-3 px-6 rounded-lg transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
              </div>

              {/* Footer Info */}
              <div className="mt-8 pt-8 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-500 mb-3">
                  If you believe this is an error or need assistance with a payment, please reach out to our support team.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs text-slate-500">
                  <a href="#" className="hover:text-[#0066FF] transition">Privacy Policy</a>
                  <span className="hidden sm:inline">•</span>
                  <a href="#" className="hover:text-[#0066FF] transition">Terms of Service</a>
                  <span className="hidden sm:inline">•</span>
                  <a href="#" className="hover:text-[#0066FF] transition">Security</a>
                </div>
                <p className="text-xs text-slate-400 mt-4">© 2025 Ordaro. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
