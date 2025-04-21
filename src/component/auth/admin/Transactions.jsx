import React, { useState, useEffect } from "react";
import { apiConnecter } from "../../services/apiconnecter";
import { useSelector } from "react-redux";
import { FaSpinner, FaSearch, FaExclamationCircle, FaWallet, FaMoneyCheckAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TransactionHistory = () => {
  const userData = useSelector((state) => state.User.userdata);
 

  const [userTransactions, setUserTransactions] = useState([]);
  const [merchantTransactions, setMerchantTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");
      try {
        const [userRes, merchantRes] = await Promise.all([
          apiConnecter("GET", `https://eventpaymentsystem.onrender.com/data/admin-user/transactions/${userData?.eventId}/${userData?.gmail}`),
          apiConnecter("GET", `https://eventpaymentsystem.onrender.com/data/admin-merchant/transactions/${userData?.eventId}/${userData?.gmail}`)
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
  }, []);

  const allTransactions = [...userTransactions, ...merchantTransactions];
  const filteredTransactions = allTransactions.filter((transaction) =>
    transaction.receiverName?.toLowerCase().includes(search.toLowerCase()) ||
    transaction.receiverGmail?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getCardBackground = (type) =>
    type === "load"
  ? "bg-gradient-to-r from-green-500 to-sky-500"
  : "bg-gradient-to-r from-green-500 to-sky-500";

  const getStatusIcon = (status) =>
    status === "Success" ? { icon: FaCheckCircle, color: "text-green-500" } : { icon: FaTimesCircle, color: "text-red-500" };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-[#6c5ce7] text-center mb-6">Transaction History</h1>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by receiver name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7] shadow-sm"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <FaSpinner className="animate-spin text-4xl text-[#6c5ce7]" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center mt-6 text-red-500">
          <FaExclamationCircle className="mr-2" />
          <p>{error}</p>
        </div>
      )}

      {currentTransactions.length > 0 ? (
        <div className="space-y-4">
          {currentTransactions.map((transaction, index) => {
            const StatusIcon = getStatusIcon(transaction.status).icon;
            const statusColor = getStatusIcon(transaction.status).color;
            return (
              <div
                key={index}
                className={`p-6 rounded-lg text-white ${getCardBackground(transaction.type)} shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {transaction.type === "load" ? (
                      <FaWallet className="text-2xl mr-3" />
                    ) : (
                      <FaMoneyCheckAlt className="text-2xl mr-3" />
                    )}
                    <p className="font-semibold text-lg">
                      {transaction.type === "load" ? "Wallet Load" : "Redeem"} - {transaction.receiverName}
                    </p>
                  </div>
                  <StatusIcon className={`text-2xl ${statusColor}`} />
                </div>
                <p className="text-sm">Receiver Email: {transaction.receiverGmail}</p>
                <p className="text-sm">Amount: ${transaction.amount}</p>
                <p className="text-sm">Description: {transaction.desc}</p>
                <p className="text-sm">Status: {transaction.status}</p>
                <p className="text-sm">Timestamp: {new Date(transaction.timestamp).toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No transactions found.</p>
      )}

      {filteredTransactions.length > transactionsPerPage && (
        <div className="flex justify-center mt-6">
          {Array.from(
            { length: Math.ceil(filteredTransactions.length / transactionsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? "bg-[#6c5ce7] text-white" : "bg-gray-200 text-gray-700"}`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
