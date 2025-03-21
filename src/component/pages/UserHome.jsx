import React from 'react';

function UserHome() {
  // Dummy data for demonstration
  const userBalance = 5000;
  const merchants = [
    { id: 1, name: 'Merchant A', qrCode: 'qr-code-a.png' },
    { id: 2, name: 'Merchant B', qrCode: 'qr-code-b.png' },
    { id: 3, name: 'Merchant C', qrCode: 'qr-code-c.png' },
  ];
  const transactions = [
    { id: 1, date: '2023-10-01', merchant: 'Merchant A', amount: 100 },
    { id: 2, date: '2023-10-02', merchant: 'Merchant B', amount: 200 },
    { id: 3, date: '2023-10-03', merchant: 'Merchant C', amount: 300 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-gray-700">
            Balance: ${userBalance}
          </span>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Merchant List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Merchants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {merchants.map((merchant) => (
            <div
              key={merchant.id}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {merchant.name}
              </h3>
              <img
                src={merchant.qrCode}
                alt={`QR Code for ${merchant.name}`}
                className="w-32 h-32 mx-auto mb-4"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Send Money Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Money</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Merchant</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                {merchants.map((merchant) => (
                  <option key={merchant.id} value={merchant.id}>
                    {merchant.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount</label>
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
              Send
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
                  Merchant
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
                    {transaction.merchant}
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

export default UserHome;