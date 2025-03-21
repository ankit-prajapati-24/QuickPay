import React from 'react';

function MerchantHome() {
  // Dummy data for demonstration
  const merchantBalance = 2500;
  const transactions = [
    { id: 1, date: '2023-10-01', user: 'User A', amount: 100 },
    { id: 2, date: '2023-10-02', user: 'User B', amount: 200 },
    { id: 3, date: '2023-10-03', user: 'User C', amount: 300 },
  ];
  const qrCode = 'merchant-qr-code.png'; // Replace with actual QR code URL

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Merchant Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-gray-700">
            Balance: ${merchantBalance}
          </span>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* QR Code for Payments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Receive Payments
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src={qrCode}
            alt="Merchant QR Code"
            className="w-48 h-48 mx-auto mb-4"
          />
          <p className="text-gray-700">Scan this QR code to receive payments.</p>
        </div>
      </div>

      {/* Redeem Balance Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Redeem Balance
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount to Redeem</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter amount"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Request Redemption
            </button>
          </form>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Transaction History
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${transaction.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MerchantHome;