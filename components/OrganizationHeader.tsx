'use client';

import Image from 'next/image';
import { Organization } from '@/lib/api/types';

interface OrganizationHeaderProps {
  organization: Organization;
}

export default function OrganizationHeader({ organization }: OrganizationHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {organization.logo && (
            <div className="relative w-10 h-10">
              <Image
                src={organization.logo}
                alt={organization.name}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div>
            <h1 className="text-lg font-bold text-gray-900">{organization.name}</h1>
            <p className="text-xs text-gray-500">Secure Payment</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="text-xs text-gray-600">SSL Secured</span>
        </div>
      </div>
    </header>
  );
}
