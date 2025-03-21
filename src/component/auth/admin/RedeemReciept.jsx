import React from 'react';

const RedeemReceipt = ({ merchant, amount, from }) => {
  return (
    <div className="flex  w-full items-center justify-center  bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-lg p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
          Transaction Receipt
        </h3>
        <div className="space-y-3 sm:space-y-4 text-gray-700">
          <div className="flex flex-col sm:flex-row justify-between">
            <span className="font-medium">From:</span>
            <span className="text-right sm:text-left">{from?.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <span className="font-medium">Merchant:</span>
            <span className="text-right sm:text-left">{merchant?.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <span className="font-medium">Email:</span>
            <span className="text-right sm:text-left">{merchant?.gmail}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <span className="font-medium">Amount Redeemed:</span>
            <span className="text-green-600 font-semibold text-right sm:text-left">
              ${amount}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <span className="font-medium">Status:</span>
            <span className="text-green-600 font-semibold text-right sm:text-left">
              Success
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <span className="font-medium">Date:</span>
            <span className="text-right sm:text-left">{new Date().toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm text-gray-500">Thank you for your transaction!</p>
        </div>
      </div>
    </div>
  );
};

export default RedeemReceipt;