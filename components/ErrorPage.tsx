'use client';

import Link from 'next/link';

interface ErrorPageProps {
  orderId: string;
}

export default function ErrorPage({ orderId }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-gray-900">Payment Failed</h1>
          <p className="text-sm text-gray-600">Order #{orderId}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Error Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            Unfortunately, your payment could not be processed. Please try again or contact support.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-red-900">
              <strong>What happened?</strong> Your payment was declined or interrupted. This could be due to:
            </p>
            <ul className="text-sm text-red-900 mt-2 ml-4 list-disc">
              <li>Insufficient funds</li>
              <li>Card expired or invalid</li>
              <li>Network connection issues</li>
              <li>Transaction timeout</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href={`/checkout/${orderId}`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you continue to experience issues with your payment, please contact our support team.
          </p>
          <a
            href="mailto:support@ordaro.com"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
          >
            Contact Support →
          </a>
        </div>
      </main>
    </div>
  );
}
