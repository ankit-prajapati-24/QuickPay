import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaSpinner, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { apiConnecter } from "../../services/apiconnecter";
import toast from "react-hot-toast";
import RedeemReceipt from "./RedeemReciept";

const RedemptionRequests = () => {
  const location = useLocation();
  const { merchant } = location.state || {};
  const userdata = useSelector(state => state.User.userdata);

  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (!merchant) {
      return;
    }
  }, [merchant]);

  const handleRedeem = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError("");
    setReceipt(null);

    try {
      const response = await apiConnecter("POST", "https://eventpaymentsystem.onrender.com/admin/redeem-merchant-wallet", {
        eventId: merchant.eventId,
        adminName: userdata?.name || "Ankit",
        adminGmail: userdata?.email || "ankitjgj3@gmail.com",
        receiver: "merchant",
        receiverName: merchant.name,
        receiverGmail: merchant.gmail,
        amount: amount,
        type: "redeem",
        status: "success",
        timestamp: new Date().toISOString(),
        desc: `Redeemed $${amount} from ${merchant.name}`,
      });

      if (response.data.rc === "00") {
        setSuccess(true);
        setReceipt(response.data);
        toast.success("Redemption successful!");
      } else {
        setError("Redemption failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex  bg-gray-100 p-6">
      <div className=" w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Redeem Merchant Wallet</h2>

        {receipt ? (
        <RedeemReceipt merchant={merchant} amount={amount} from={ {name:"ankit"}}/>
        ) : (
          <>
            <div className="mb-6  p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-lg font-semibold text-gray-700">Merchant: {merchant?.name}</p>
              <p className="text-sm text-gray-600">Email: {merchant?.gmail}</p>
              <p className="text-sm text-gray-600">Balance: ${merchant?.balance}</p>
            </div>

            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount to Redeem
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Enter amount"
                min="1"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4 text-center font-semibold">{error}</p>}

            <button
              onClick={handleRedeem}
              disabled={loading || success}
              className={`w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2 text-yellow-500" />
              ) : success ? (
                <FaCheckCircle className="mr-2 text-green-500" />
              ) : (
                <>
                  <FaMoneyBillWave className="mr-2" /> Redeem
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RedemptionRequests;
