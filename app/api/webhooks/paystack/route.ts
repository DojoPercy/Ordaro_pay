import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';
import { rateLimiter } from '@/lib/rate-limiter';

interface PaystackWebhookPayload {
  event: string;
  data: {
    id: number;
    reference: string;
    amount: number;
    paid_at: string;
    customer: {
      id: number;
      email: string;
      customer_code: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
    plan?: number;
    order_id?: string;
    status: string;
  };
}

/**
 * Verify Paystack webhook signature
 */
function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (!secret) {
    logger.error('PAYSTACK_WEBHOOK_SECRET not configured');
    return false;
  }

  const hash = crypto
    .createHmac('sha512', secret)
    .update(payload)
    .digest('hex');

  return hash === signature;
}

/**
 * Handle payment.success event
 */
async function handlePaymentSuccess(data: PaystackWebhookPayload['data']): Promise<void> {
  logger.info('Processing payment success', {
    reference: data.reference,
    amount: data.amount,
    customer: data.customer.email,
  });

  try {
    // TODO: Update payment status in database
    // TODO: Send confirmation email
    // TODO: Trigger order completion workflow
    logger.info('Payment success processed', { reference: data.reference });
  } catch (error) {
    logger.error('Failed to process payment success', error as Error, {
      reference: data.reference,
    });
    throw error;
  }
}

/**
 * Handle invoice.payment_failed event
 */
async function handlePaymentFailed(data: PaystackWebhookPayload['data']): Promise<void> {
  logger.warn('Payment failed', {
    reference: data.reference,
    amount: data.amount,
  });

  try {
    // TODO: Update payment status to failed
    // TODO: Send failure notification
    logger.info('Payment failure processed', { reference: data.reference });
  } catch (error) {
    logger.error('Failed to process payment failure', error as Error, {
      reference: data.reference,
    });
  }
}

/**
 * POST /api/webhooks/paystack
 * Handle Paystack webhook events
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitResult = rateLimiter.check(`webhook:${clientIp}`);

    if (!rateLimitResult.allowed) {
      logger.warn('Webhook rate limit exceeded', { clientIp });
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Get signature from headers
    const signature = request.headers.get('x-paystack-signature');
    if (!signature) {
      logger.warn('Missing webhook signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // Get raw body for signature verification
    const body = await request.text();

    // Verify signature
    if (!verifyWebhookSignature(body, signature)) {
      logger.warn('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse payload
    const payload: PaystackWebhookPayload = JSON.parse(body);

    logger.info('Webhook received', {
      event: payload.event,
      reference: payload.data.reference,
    });

    // Handle different event types
    switch (payload.event) {
      case 'charge.success':
      case 'payment.success':
        await handlePaymentSuccess(payload.data);
        break;

      case 'charge.failed':
      case 'payment.failed':
        await handlePaymentFailed(payload.data);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(payload.data);
        break;

      default:
        logger.debug('Unhandled webhook event', { event: payload.event });
    }

    return NextResponse.json(
      { success: true, message: 'Webhook processed' },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Webhook processing error', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/paystack
 * Health check endpoint
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { status: 'ok', message: 'Paystack webhook endpoint is active' },
    { status: 200 }
  );
}
