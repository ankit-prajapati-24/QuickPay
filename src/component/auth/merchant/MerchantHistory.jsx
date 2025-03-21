import React, { useState, useEffect } from "react";
import { apiConnecter } from "../../services/apiconnecter";
import { useSelector } from "react-redux";
import { FaSpinner, FaSearch } from "react-icons/fa";

const MerchantTransactionHistory = () => {
  const userData = useSelector((state) => state.User.userdata);
  const [userTransactions, setUserTransactions] = useState([]); // Admin-User Wallet Load Transactions
  const [merchantTransactions, setMerchantTransactions] = useState([]); // Admin-Merchant Redeem Transactions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch Transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const [userRes, merchantRes] = await Promise.all([
          apiConnecter("GET", `https://eventpaymentsystem.onrender.com/data/admin-user/transactions/${userData?.eventId}/${userData?.gmail}`),
          apiConnecter("GET", `https://eventpaymentsystem.onrender.com/data/admin-merchant/transactions/${userData?.eventId}/${userData?.gmail}`),
        ]);
        console.log(userRes,merchantRes);
        setUserTransactions(userRes.data || []);
        setMerchantTransactions(merchantRes.data || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userData?.eventId && userData?.gmail) {
      fetchTransactions();
    }
  }, [userData]);

  // Combine and filter transactions
  const allTransactions = [...userTransactions, ...merchantTransactions];
  const filteredTransactions = allTransactions.filter(
    (transaction) =>
      transaction.receiverName?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.receiverGmail?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-[#6c5ce7] text-center mb-6">Transaction History</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by receiver name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <FaSpinner className="animate-spin text-4xl text-[#6c5ce7]" />
        </div>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Show All Transactions */}
      {filteredTransactions.length > 0 ? (
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => (
            <div key={index} className="border p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
              <p className="font-semibold text-lg">
                {transaction.type === "load" ? "Wallet Load" : "Redeem"} - {transaction.receiverName}
              </p>
              <p className="text-sm text-gray-600">Receiver Email: {transaction.receiverGmail}</p>
              <p className="text-sm text-gray-600">Amount: ${transaction.amount}</p>
              <p className="text-sm text-gray-600">Description: {transaction.desc}</p>
              <p className="text-sm text-gray-600">Status: {transaction.status}</p>
              <p className="text-sm text-gray-600">Timestamp: {new Date(transaction.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default MerchantTransactionHistory;