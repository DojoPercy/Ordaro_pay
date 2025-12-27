'use client';

import { useParams } from 'next/navigation';
import ErrorPage from '@/components/ErrorPage';

export default function Page() {
  const params = useParams();
  const orderId = params.orderId as string;

  return <ErrorPage orderId={orderId} />;
}
