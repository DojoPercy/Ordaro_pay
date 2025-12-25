'use client';

import { useParams } from 'next/navigation';
import CheckoutPage from '@/components/CheckoutPage';

export default function Page() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  // Extract orderId from sessionId or fetch from API
  // For now, we'll use sessionId as orderId
  const orderId = sessionId;

  return <CheckoutPage orderId={orderId} />;
}
