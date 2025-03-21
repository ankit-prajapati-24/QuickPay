import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiConnecter } from '../../services/apiconnecter';
import { FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';

export default function UserTransactionHistory() {
  const userdata = useSelector((state) => state.User.userdata);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userdata.eventId || !userdata.gmail) {
      setError('Missing user details.');
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await apiConnecter(
          'GET',
          `https://eventpaymentsystem.onrender.com/data/user-transactions/${userdata.eventId}/${userdata.gmail}`
        );

        if (response && response.data) {
          const reversedTransactions = response.data.reverse(); // Show newest transactions first
          setTransactions(reversedTransactions);
          setFilteredTransactions(reversedTransactions);
        } else {
          setError('No transactions found.');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userdata.eventId, userdata.gmail]);

  // Search functionality
  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = transactions.filter((transaction) =>
      transaction.merchantGmail.toLowerCase().includes(lowerCaseSearch) ||
      transaction.senderGmail.toLowerCase().includes(lowerCaseSearch) ||
      transaction.amount.toString().includes(lowerCaseSearch)
    );

    setFilteredTransactions(filtered);
  }, [searchTerm, transactions]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Transaction History</h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
          />
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center">No matching transactions found.</p>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const isSender = transaction.senderGmail === userdata.gmail;
              const transactionType = isSender ? 'Sent' : 'Received';
              const transactionAmountClass = isSender ? 'text-red-600' : 'text-green-600';
              const transactionIcon = isSender ? <FaArrowUp /> : <FaArrowDown />;
              const avatarUrl = `https://ui-avatars.com/api/?name=${
                isSender ? transaction.merchantGmail : transaction.senderGmail
              }&background=random`;

              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 border"
                >
                  {/* Left Side: Avatar & Details */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full border border-gray-300"
                    />
                    <div>
                      <p className="text-gray-900 font-semibold">
                        {isSender ? transaction.merchantGmail : transaction.senderGmail}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                      <p className="text-xs font-medium text-gray-600">{transaction.status}</p>
                    </div>
                  </div>

                  {/* Right Side: Amount & Type */}
                  <div className="text-right">
                    <p className={`text-lg font-bold ${transactionAmountClass}`}>
                      {isSender ? '-' : '+'}₹{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      {transactionIcon} &nbsp; {transactionType}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
