import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function PaymentModal({ 
  show, 
  onClose, 
  paymentDetails, 
  setPaymentDetails, 
  onSubmit,
  userBalance 
}) {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!paymentDetails.merchantId || !paymentDetails.amount) {
        return;
      }
      if (parseFloat(paymentDetails.amount) > userBalance) {
        alert('Insufficient balance!');
        return;
      }
      setStep(2);
    } else {
      onSubmit(pin);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {step === 1 ? 'Payment Details' : 'Enter PIN'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Merchant ID
                </label>
                <input
                  type="text"
                  value={paymentDetails.merchantId}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, merchantId: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={paymentDetails.amount}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={paymentDetails.notes}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Please enter your 4-digit PIN to confirm payment of ${paymentDetails.amount} to merchant {paymentDetails.merchantId}
              </p>
              <div>
                <input
                  type="password"
                  maxLength="4"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {step === 1 ? 'Continue' : 'Confirm Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}