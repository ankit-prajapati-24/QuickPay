import React from 'react';

function AdminHome() {
  // Dummy data for demonstration
  const eventDetails = { id: 'EVT123', name: 'Tech Conference 2023' };
  const merchants = [
    { id: 1, name: 'Merchant A', email: 'merchantA@example.com' },
    { id: 2, name: 'Merchant B', email: 'merchantB@example.com' },
  ];
  const users = [
    { id: 1, name: 'User A', email: 'userA@example.com', balance: 100 },
    { id: 2, name: 'User B', email: 'userB@example.com', balance: 200 },
  ];
  const admins = [
    { id: 1, name: 'Admin A', email: 'adminA@example.com' },
    { id: 2, name: 'Admin B', email: 'adminB@example.com' },
  ];
  const transactions = [
    { id: 1, date: '2023-10-01', user: 'User A', merchant: 'Merchant A', amount: 50 },
    { id: 2, date: '2023-10-02', user: 'User B', merchant: 'Merchant B', amount: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      {/* Event Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">
            <span className="font-semibold">Event ID:</span> {eventDetails.id}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Event Name:</span> {eventDetails.name}
          </p>
        </div>
      </div>

      {/* Merchant Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Merchants</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">All Merchants</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Merchant
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{merchant.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{merchant.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add User
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${user.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Admins</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">All Admins</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Admin
            </button>
          </div>
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{admin.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{admin.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    {transaction.user}
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

export default AdminHome;