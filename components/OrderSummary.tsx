'use client';

import { Order } from '@/lib/api/types';

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Order Number and Date */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="text-lg font-semibold text-gray-900">{order.orderNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Order Date</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Items</h3>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              {item.modifiers && item.modifiers.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  {item.modifiers.map((mod) => (
                    <div key={mod.id}>{mod.name}</div>
                  ))}
                </div>
              )}
            </div>
            <p className="font-semibold text-gray-900 ml-4">
              {formatCurrency(item.totalPrice)}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium text-gray-900">{formatCurrency(order.subtotal)}</p>
        </div>

        {order.tax > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Tax</p>
            <p className="font-medium text-gray-900">{formatCurrency(order.tax)}</p>
          </div>
        )}

        {order.discount && order.discount > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Discount</p>
            <p className="font-medium text-green-600">-{formatCurrency(order.discount)}</p>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <p className="font-semibold text-gray-900">Total Amount</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(order.total)}</p>
        </div>
      </div>

      {/* Customer Info */}
      {order.customer && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {order.customer.name}
            </p>
            {order.customer.email && (
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {order.customer.email}
              </p>
            )}
            {order.customer.phone && (
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {order.customer.phone}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
