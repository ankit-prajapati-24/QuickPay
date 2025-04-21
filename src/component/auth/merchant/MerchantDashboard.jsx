import React, { useState, useEffect } from "react";
import { apiConnecter } from "../../services/apiconnecter";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner, FaMoneyCheckAlt, FaQrcode, FaUser, FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import MerchantSidebar from "./MerchantSidebar";
import BalanceCard from "./BalanceCard";
import MerchantInfo from "./MerchantInfo";
import QRCodeSection from "./QRCodeSection";
import MerchantTransactionHistory from "./MerchantHistory";
import { setuserdata } from "../../../slices/UserSlice";


const MerchantDashboard = () => {
  const userData = useSelector((state) => state.User.userdata);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const dispatch = useDispatch();

  // Merchant details
  const merchantDetails = {
    id: userData?.id || "N/A",
    name: userData?.name || "N/A",
    eventId: userData?.eventId || "N/A",
    balance: userData?.balance || 44,
    gmail: userData?.gmail || "N/A",
    merchantId: userData?.merchantId || "N/A",
    mobile: userData?.mobile || "N/A",
  };

  // Fetch Merchant Data
  useEffect(() => {
    const fetchMerchantData = async () => {
      setLoading(true);
      try {
        // Fetch transactions
        const transactionsRes = await apiConnecter(
          "GET",
          `https://eventpaymentsystem.onrender.com/data/admin-merchant/transactions/${userData?.eventId}/${userData?.gmail}`
        );
        setTransactions(transactionsRes.data || []);

        // Fetch balance (assuming balance is part of the merchant data)
        const merchantRes = await apiConnecter(
          "GET",
          `https://eventpaymentsystem.onrender.com/data/merchant-data/${userData?.eventId}/${userData?.gmail}`
        );
        
        console.log(merchantRes,merchantRes.data.balance);
        
        dispatch(setuserdata(merchantRes.data));
      } catch (error) {
        console.error("Error fetching merchant data:", error);
        // setError("Failed to fetch merchant data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userData?.eventId && userData?.gmail) {
      fetchMerchantData();
    }
  }, []);

  // Handle Redeem Balance
  const handleRedeemBalance = async () => {
    if (redeemAmount <= 0 || redeemAmount > balance) {
      alert("Please enter a valid amount to redeem.");
      return;
    }

    try {
      const response = await apiConnecter("POST", "https://eventpaymentsystem.onrender.com/merchant/redeem", {
        eventId: userData?.eventId,
        merchantGmail: userData?.gmail,
        amount: redeemAmount,
      });

      if (response.data.status === "success") {
        alert("Redeem request submitted successfully!");
        setBalance((prevBalance) => prevBalance - redeemAmount);
        setRedeemAmount(0);
      } else {
        alert("Failed to submit redeem request. Please try again.");
      }
    } catch (error) {
      console.error("Error redeeming balance:", error);
      setError("Failed to redeem balance. Please try again.");
    }
  };

  return (
    <main className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 sm:mt-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MerchantInfo merchantData={userData} />
      <QRCodeSection paymentAddress={`${userData.gmail}&${userData.eventId}`} />
    </div>
    <div className="mt-6 space-y-6">
      <BalanceCard balance={userData.balance}/>
      <MerchantTransactionHistory/>
    </div>
  </main>
  );
};

export default MerchantDashboard;