import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "react-feather"; // For the animated checkmark icon
import Lottie from "lottie-react"; // For animations
import successAnimation from "../SVGS/Animation - 1739538688425.json"; // Replace with your Lottie animation file

const ShowBalance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [balance, setBalance] = useState(location.state?.balance || "₹10,000");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const userName = location.state?.userName || "User";

  const fetchBalance = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate an API call to fetch the balance
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ balance: "₹15,000", transactionId: "TX123456789" }), 1000)
      );
      setBalance(response.balance);
      setTransactionId(response.transactionId);
      setShowSuccess(true); // Show success animation
    } catch (err) {
      setError("Failed to fetch balance. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch balance on component mount
    fetchBalance();
  }, []);

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the MPIN input page
  };

  const handleLogout = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleDone = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {userName}!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your Account Balance Has Fetched Successfully</h2>

        {isLoading ? (
          <p className="text-2xl font-bold text-gray-600 mb-8">Loading...</p>
        ) : error ? (
          <p className="text-2xl font-bold text-red-600 mb-8">{error}</p>
        ) : (
          <>
            {showSuccess && (
              <div className="flex justify-center mb-6">
                <Lottie animationData={successAnimation} loop={false} style={{ width: 100, height: 100 }} />
              </div>
            )}
            <p className="text-4xl font-bold text-green-600 mb-4">{balance}</p>
            {transactionId && (
              <p className="text-lg text-gray-600 mb-8">
                UID: <span className="font-semibold">{transactionId}</span>
              </p>
            )}
          </>
        )}

        <button
          onClick={fetchBalance}
          disabled={isLoading}
          className="w-full p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold text-xl mb-4 hover:from-green-700 hover:to-teal-700 transition duration-300 disabled:opacity-50"
        >
          Refresh Balance
        </button>

        <button
          onClick={handleDone}
          className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-xl mb-4 hover:from-blue-700 hover:to-[#6c5ce7] transition duration-300"
        >
          Done
        </button>

        <button
          onClick={handleLogout}
          className="w-full p-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-bold text-xl hover:from-red-700 hover:to-pink-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ShowBalance;