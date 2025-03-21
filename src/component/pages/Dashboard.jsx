import React from "react";
import { NavLink } from "react-router-dom";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen, QuickPayIcon } from "../common/Icons";
import { useSelector } from "react-redux";

function Dashboard() {
  const { UserData, Token } = useSelector((state) => state.User);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen p-8">
      {/* Dashboard Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#6c5ce7] mb-4">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {UserData?.name || "User"}!</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Balance */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-2">Total Balance</h3>
          <p className="text-3xl font-bold text-gray-800">$5,000</p>
          <p className="text-gray-600">Available Funds</p>
        </div>

        {/* Card 2: Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-2">Recent Transactions</h3>
          <p className="text-3xl font-bold text-gray-800">12</p>
          <p className="text-gray-600">Last 7 Days</p>
        </div>

        {/* Card 3: Active Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-gray-800">1,234</p>
          <p className="text-gray-600">Currently Online</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Chart 1: Monthly Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-4">Monthly Revenue</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Chart Placeholder</span>
          </div>
        </div>

        {/* Chart 2: User Activity */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-4">User Activity</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-600">Chart Placeholder</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-[#6c5ce7] mb-4">Recent Transactions</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Rows */}
            <tr className="border-b">
              <td className="p-2">2023-10-01</td>
              <td className="p-2">Payment to Merchant A</td>
              <td className="p-2">$100</td>
              <td className="p-2 text-green-500">Completed</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">2023-10-02</td>
              <td className="p-2">Payment to Merchant B</td>
              <td className="p-2">$50</td>
              <td className="p-2 text-yellow-500">Pending</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">2023-10-03</td>
              <td className="p-2">Payment to Merchant C</td>
              <td className="p-2">$200</td>
              <td className="p-2 text-red-500">Failed</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <NavLink
          to="/ProfilePage"
          className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-purple-50 transition duration-300"
        >
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-2">Update Profile</h3>
          <p className="text-gray-600">Edit your personal information</p>
        </NavLink>
        <NavLink
          to="/ChangePassword"
          className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-purple-50 transition duration-300"
        >
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-2">Change Password</h3>
          <p className="text-gray-600">Update your account password</p>
        </NavLink>
        <NavLink
          to="/Transactions"
          className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-purple-50 transition duration-300"
        >
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-2">View Transactions</h3>
          <p className="text-gray-600">Check your transaction history</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Dashboard;