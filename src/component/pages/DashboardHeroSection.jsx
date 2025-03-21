import React from "react";
import { useNavigate } from "react-router-dom";
const DashboardHeroSection = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#6c5ce7] text-center mb-8">
          Welcome to Your Dashboard
        </h1>

        {/* Grid of Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Scan QR */}
          <div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2" onClick={() => {
              navigate("/QRScanner")
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6c5ce7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-[#6c5ce7] text-center">Scan QR</h2>
            <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block">
              Scan a QR code to make payments or receive funds.
            </p>
          </div>

          {/* Check Balance */}
          <div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
            onClick={() => {
              navigate("/MPIN")
            }
            }
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6c5ce7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-[#6c5ce7] text-center">Check Balance</h2>
            <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block">
              View your current token balance and transaction history.
            </p>
          </div>

          {/* Transfer through ID */}
          <div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6c5ce7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-[#6c5ce7] text-center">Transfer</h2>
            <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block">
              Send tokens to another user using their unique ID.
            </p>
          </div>

          {/* View Transaction History */}
          <div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6c5ce7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-[#6c5ce7] text-center">History</h2>
            <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block">
              View all your past transactions in detail.
            </p>
          </div>

          {/* Add Funds */}
          <div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6c5ce7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-[#6c5ce7] text-center">Add Funds</h2>
            <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block">
              Load more tokens into your wallet for seamless transactions.
            </p>
          </div>

          {/* Logout */}
          <div
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#6c5ce7]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-[#6c5ce7] text-center">Logout</h2>
            <p className="text-xs text-gray-600 text-center mt-1 hidden sm:block">
              Securely log out of your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeroSection;