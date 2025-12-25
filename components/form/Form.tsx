'use client';

import { ReactNode } from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  isLoading?: boolean;
  submitButtonText?: string;
  submitButtonVariant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export default function Form({
  onSubmit,
  children,
  isLoading = false,
  submitButtonText = 'Submit',
  submitButtonVariant = 'primary',
  className = '',
}: FormProps) {
  const buttonClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
    secondary: 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 disabled:bg-red-400',
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {children}

      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full text-white font-semibold py-3 px-4 rounded-lg
          transition-colors disabled:cursor-not-allowed
          ${buttonClasses[submitButtonVariant]}
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          submitButtonText
        )}
      </button>
    </form>
  );
}
