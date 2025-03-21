import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiConnecter } from "../../services/apiconnecter";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { setuserdata } from "../../../slices/UserSlice";

export default function PaymentForm({ eventId: qrEventId, gmail: qrGmail }) {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.User.userdata);
  const navigate = useNavigate();
  const location = useLocation(); // Capture navigation state

  // Extract data from navigation state if available
  const stateData = location.state || {}; // Data from navigate("/user/payment", { state: userData })

  // Prioritize data sources (state > QR > Redux)
  const eventId = stateData.eventId || qrEventId || userdata.eventId;
  const senderGmail = stateData.gmail || qrGmail || userdata.gmail;
  const senderName = stateData.name || userdata?.name || "Unknown User";

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [merchantGmail, setMerchantGmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!merchantGmail) newErrors.merchantGmail = "Merchant Gmail is required.";
    if (!amount || amount <= 0) newErrors.amount = "Enter a valid amount.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateInputs()) return;

    const transactionDetails = {
      eventId,
      senderName,
      senderGmail,
      receiverName: merchantGmail.split("@")[0],
      merchantGmail,
      amount: parseInt(amount, 10),
      type: "credit",
      status: "Success",
      desc: note,
      timestamp: new Date().toLocaleString(),
    };

    if (transactionDetails.amount > userdata.balance) {
      toast.error("Insufficient funds");
      return;
    }

    const toastId = toast.loading("Processing payment...");
    setIsLoading(true);

    try {
      const response = await apiConnecter(
        "POST",
        "https://eventpaymentsystem.onrender.com/user-transaction/transaction",
        transactionDetails
      );

      toast.dismiss(toastId);
      toast.success(response.message || "Transaction Successful!");
      setIsSuccess(true);
      setTransactionData(transactionDetails);

      // Fetch updated balance
      const newBalance = await apiConnecter(
        "GET",
        `https://eventpaymentsystem.onrender.com/data/user-balance/${eventId}/${senderGmail}`
      );

      if (newBalance && newBalance.data !== undefined) {
        const formattedBalance = Number(newBalance.data).toLocaleString();
        dispatch(setuserdata({ ...userdata, balance: formattedBalance }));
      } else {
        console.error("Invalid response from API:", response);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Transaction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Make a Payment
      </h2>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <FaSpinner className="animate-spin text-yellow-500 text-8xl" />
          <p className="text-yellow-500 mt-2 font-semibold">Processing...</p>
        </div>
      ) : isSuccess ? (
        <div className="flex flex-col items-center text-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-3" />
          <p className="text-green-500 text-lg font-semibold">
            Transaction Successful!
          </p>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md w-full text-left">
            <h3 className="font-bold text-gray-700 text-lg mb-2">
              Transaction Receipt
            </h3>
            <div className="border-t border-gray-300 pt-2">
              <p className="text-gray-600">
                <strong>Sender:</strong> {transactionData.senderName}
              </p>
              <p className="text-gray-600">
                <strong>Receiver:</strong> {transactionData.receiverName}
              </p>
              <p className="text-gray-600">
                <strong>Event ID:</strong> {transactionData.eventId}
              </p>
              <p className="text-gray-600">
                <strong>Timestamp:</strong> {transactionData.timestamp}
              </p>
              <p className="text-gray-600">
                <strong>Amount:</strong> ₹{transactionData.amount}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> ✅ {transactionData.status}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/home")}
            className="mt-4 px-6 py-2 bg-[#6c5ce7] text-white font-semibold rounded-lg shadow-md hover:bg-[#5b4bcf] transition duration-300"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="bg-[#6c5ce7] text-white rounded-lg p-4 mb-4 text-center shadow-md">
            <p className="text-sm opacity-90">
              Event ID: <span className="font-medium">{eventId || "N/A"}</span>
            </p>
          </div>

          <label className="block text-gray-700 font-medium mb-1">
            Merchant Gmail
          </label>
          <input
            type="email"
            placeholder="Enter Merchant Gmail"
            value={merchantGmail}
            onChange={(e) => setMerchantGmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c5ce7] mb-4 ${
              errors.merchantGmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.merchantGmail && (
            <p className="text-red-500 text-sm">{errors.merchantGmail}</p>
          )}

          <label className="block text-gray-700 font-medium mb-1">
            Enter Amount (₹)
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c5ce7] mb-4 ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

          <button
            onClick={handlePayment}
            className="w-full py-3 rounded-md font-semibold text-lg shadow-md bg-[#6c5ce7] text-white hover:bg-[#5b4bcf] transition duration-300"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}
