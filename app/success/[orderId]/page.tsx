'use client';

import { useParams } from 'next/navigation';
import SuccessPage from '@/components/SuccessPage';

export default function Page() {
  const params = useParams();
  const orderId = params.orderId as string;

  return <SuccessPage orderId={orderId} />;
}
