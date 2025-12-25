'use client';

import TextInput from './TextInput';
import { validatePhone } from '@/lib/validation';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function PhoneInput({
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder = '+234 (0) 123 456 7890',
}: PhoneInputProps) {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  const validationError = error || (value && !validatePhone(value) ? 'Please enter a valid phone number' : undefined);

  return (
    <TextInput
      id="phone"
      label="Phone Number"
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      error={validationError}
      required={required}
      disabled={disabled}
      autoComplete="tel"
      helperText="Optional: We may use this to contact you about your order"
    />
  );
}
