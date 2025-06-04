import React, { useState } from 'react';
import { useCart, PaymentMethod } from '../../../contexts/CartContext';
import { X, CreditCard, Gift, Wallet } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const formatPeso = (amount: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onComplete }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<PaymentMethod['type']>('cash');
  const [cardReference, setCardReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    total,
    totalPaid,
    balance,
    addPayment,
    state: { customer },
  } = useCart();

  const remainingAmount = Math.max(0, total - totalPaid);
  const hasChange = balance > 0;

  const handleQuickAmount = (amount: number) => {
    setPaymentAmount(amount.toFixed(2));
  };

  const handleSubmitPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    setIsProcessing(true);

    const payment: PaymentMethod = {
      type: paymentType,
      amount,
      reference: paymentType !== 'cash' ? cardReference : undefined,
    };

    addPayment(payment);
    setPaymentAmount('');
    setCardReference('');

    setTimeout(() => {
      setIsProcessing(false);
      if (amount >= remainingAmount) {
        onComplete();
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Payment</h3>
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Total Amount</div>
            <div className="text-2xl font-bold">{formatPeso(total)}</div>

            {totalPaid > 0 && (
              <div className="mt-2">
                <div className="text-sm text-gray-500">Paid</div>
                <div className="text-lg font-medium text-success-600">
                  {formatPeso(totalPaid)}
                </div>
              </div>
            )}

            {!hasChange && totalPaid > 0 && (
              <div className="mt-2">
                <div className="text-sm text-gray-500">Remaining</div>
                <div className="text-lg font-medium text-primary-600">
                  {formatPeso(remainingAmount)}
                </div>
              </div>
            )}

            {hasChange && (
              <div className="mt-2">
                <div className="text-sm text-gray-500">Change</div>
                <div className="text-lg font-medium text-warning-600">
                  {formatPeso(balance)}
                </div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`p-3 flex items-center justify-center rounded-md border ${
                  paymentType === 'cash'
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => setPaymentType('cash')}
              >
                  <span className="text-lg font-bold mr-2">₱</span>
                Cash
              </button>
              <button
                className={`p-3 flex items-center justify-center rounded-md border ${
                  paymentType === 'credit' || paymentType === 'debit'
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => setPaymentType('credit')}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Card
              </button>
              <button
                className={`p-3 flex items-center justify-center rounded-md border ${
                  paymentType === 'gift_card'
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => setPaymentType('gift_card')}
              >
                <Gift className="h-5 w-5 mr-2" />
                Gift Card
              </button>
              <button
                className={`p-3 flex items-center justify-center rounded-md border ${
                  paymentType === 'loyalty'
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => setPaymentType('loyalty')}
                disabled={!customer || customer.loyaltyPoints < 100}
              >
                <Wallet className="h-5 w-5 mr-2" />
                Loyalty
              </button>
            </div>
          </div>

          {(paymentType === 'credit' ||
            paymentType === 'debit' ||
            paymentType === 'gift_card') && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {paymentType === 'gift_card'
                  ? 'Gift Card Number'
                  : 'Card Number'}
              </label>
              <input
                type="text"
                className="input"
                placeholder={
                  paymentType === 'gift_card'
                    ? 'Enter gift card number'
                    : 'Last 4 digits'
                }
                value={cardReference}
                onChange={(e) => setCardReference(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                ₱
              </span>
              <input
                type="text"
                className="input rounded-l-none"
                placeholder="0.00"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              className="p-2 border rounded-md hover:bg-gray-50"
              onClick={() => handleQuickAmount(50)}
            >
              {formatPeso(50)}
            </button>
            <button
              className="p-2 border rounded-md hover:bg-gray-50"
              onClick={() => handleQuickAmount(100)}
            >
              {formatPeso(100)}
            </button>
            <button
              className="p-2 border rounded-md hover:bg-gray-50"
              onClick={() => handleQuickAmount(200)}
            >
              {formatPeso(200)}
            </button>
            <button
              className="p-2 border rounded-md hover:bg-gray-50"
              onClick={() => handleQuickAmount(500)}
            >
              {formatPeso(500)}
            </button>
            <button
              className="p-2 border rounded-md hover:bg-gray-50"
              onClick={() => handleQuickAmount(1000)}
            >
              {formatPeso(1000)}
            </button>
            <button
              className="p-2 border rounded-md hover:bg-gray-50 text-primary-600"
              onClick={() => setPaymentAmount(remainingAmount.toFixed(2))}
            >
              Exact
            </button>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button className="btn btn-ghost mr-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary min-w-[100px]"
            onClick={handleSubmitPayment}
            disabled={isProcessing || !paymentAmount}
          >
            {isProcessing ? 'Processing...' : 'Add Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
