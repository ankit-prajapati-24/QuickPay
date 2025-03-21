import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UserBalanceCard from './BalanceCard';
import PaymentModal from './PaymentModal';
import { FaUserCircle } from 'react-icons/fa';
import { apiConnecter } from '../../services/apiconnecter';
import RecentActivity from './RecentActivity';

function UserDashboard({ userdata }) {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userdata?.eventId || !userdata?.gmail) {
      setError('User data is missing.');
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
          setTransactions(response.data);
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

  // Find the most frequent merchant from fetched transactions
  const getFrequentMerchant = () => {
    if (transactions.length === 0) return null;

    const merchantCount = {};

    transactions.forEach((transaction) => {
      if (transaction.merchantGmail) {
        merchantCount[transaction.merchantGmail] = (merchantCount[transaction.merchantGmail] || 0) + 1;
      }
    });

    const mostUsedMerchant = Object.keys(merchantCount).reduce((a, b) =>
      merchantCount[a] > merchantCount[b] ? a : b
    );

    return mostUsedMerchant ? { email: mostUsedMerchant, name: mostUsedMerchant.split('@')[0] } : null;
  };

  const frequentMerchant = getFrequentMerchant();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">

      {/* User Greeting & Event Details */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
      >
        {/* User Greeting Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, {userdata?.name || "User"} 👋
          </h1>
          <p className="text-gray-500 text-lg mt-2">
            Manage your payments and transactions easily
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <FaUserCircle className="text-5xl text-gray-600" />
          </div>
        </div>

        {/* Event Details Card */}
        <div className="bg-gradient-to-r from-[#6c5ce7] to-[#8e7dff] text-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">Current Event</h2>
          <p className="mt-2 text-lg opacity-90">
            Event ID: <span className="font-medium">{userdata?.eventId || "N/A"}</span>
          </p>
          <p className="text-3xl font-bold mt-4">{userdata?.eventName || "Udaan 2K25"}</p>
        </div>
      </motion.div>

      {/* Balance & Frequent Merchant Quick Pay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <UserBalanceCard balance={userdata?.balance} merchantId={userdata?.merchantId} />

        {/* Quick Pay - Most Frequent Merchant */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Quick Pay</h3>
          {frequentMerchant ? (
            <div className="flex flex-col items-center">
              <img src={`https://ui-avatars.com/api/?name=${frequentMerchant.name}`} alt="Merchant" className="w-16 h-16 rounded-full mb-2" />
              <p className="text-lg font-medium">{frequentMerchant.name}</p>
              <p className="text-sm text-gray-500">{frequentMerchant.email}</p>
              <button
                className="mt-4 px-4 py-2 bg-[#6c5ce7] text-white rounded-md text-sm font-medium hover:bg-[#5b4bcf]"
              >
                Pay {frequentMerchant.name}
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">No frequent merchants yet. Your most-used merchant will appear here.</p>
          )}
        </div>
      </motion.div>

      {/* Payment Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <PaymentModal />
      </motion.div>

      {/* Recent Activity (Last 2-3 Transactions) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-white rounded-2xl "
      >
        {/* <h3 className="text-lg font-semibold">Recent Activity</h3> */}
        {loading ? (
          <p className="text-gray-500 text-sm text-center">Loading recent transactions...</p>
        ) : transactions.length > 0 ? (
          <>
           <RecentActivity/>
          </>
        ) : (
          <p className="text-gray-500 text-sm text-center">{error || "No recent activity. Your transactions will appear here."}</p>
        )}
      </motion.div>

    </div>
  );
}

export default UserDashboard;
