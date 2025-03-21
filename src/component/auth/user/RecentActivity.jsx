import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiConnecter } from '../../services/apiconnecter';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function RecentActivity() {
  const userdata = useSelector((state) => state.User.userdata);
  const [transactions, setTransactions] = useState([]);
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
          setTransactions(reversedTransactions.slice(0, 3)); // Limit to last 2-3 transactions
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h3 className="text-lg font-semibold">Recent Activity</h3>

      {loading ? (
        <div className="flex justify-center py-6">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#6c5ce7] rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No recent activity.</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const isSender = transaction.senderGmail === userdata.gmail;
            const transactionType = isSender ? 'Sent' : 'Received';
            const transactionAmountClass = isSender ? 'text-red-600' : 'text-green-600';
            const transactionIcon = isSender ? <FaArrowUp /> : <FaArrowDown />;
            const spinnerColor = isSender ? 'border-red-500' : 'border-green-500';
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
                    <p className="text-gray-900 font-semibold text-sm">
                      {isSender ? transaction.merchantGmail : transaction.senderGmail}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Right Side: Amount & Type */}
                <div className="text-right">
                  {loading ? (
                    <div className={`w-6 h-6 border-4 ${spinnerColor} border-t-transparent rounded-full animate-spin`}></div>
                  ) : (
                    <>
                      <p className={`text-lg font-bold ${transactionAmountClass}`}>
                        {isSender ? '-' : '+'}₹{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        {transactionIcon} &nbsp; {transactionType}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View All Transactions Button */}
      <div className="mt-4 text-center">
        <button
          onClick={() => window.location.href = '/user/History'}
          className="text-[#6c5ce7] font-semibold hover:underline"
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
}
