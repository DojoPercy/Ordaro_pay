'use client';

import TextInput from './TextInput';
import { validateEmail } from '@/lib/validation';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function EmailInput({
  value,
  onChange,
  error,
  required = true,
  disabled = false,
  placeholder = 'your@email.com',
}: EmailInputProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  const validationError = error || (value && !validateEmail(value) ? 'Please enter a valid email address' : undefined);

  return (
    <TextInput
      id="email"
      label="Email Address"
      type="email"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      error={validationError}
      required={required}
      disabled={disabled}
      autoComplete="email"
      helperText="We'll send your receipt to this email"
    />
  );
}
