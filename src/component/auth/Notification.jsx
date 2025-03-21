import { useState } from "react";

const Notification = () => {
  const notifications = [
    // QuickPay Notifications
    { message: "Payment of ₹2500 sent to Ankit via QuickPay", time: "09:00 AM" },
    { message: "₹1500 received from Rajesh via QuickPay", time: "09:45 AM" },
    { message: "Transaction failed! Insufficient balance", time: "11:00 AM" },
    { message: "Your KYC verification is successful!", time: "01:30 PM" },
    { message: "Cashback of ₹50 credited for QuickPay transaction", time: "02:15 PM" },
    { message: "Monthly subscription auto-paid via QuickPay: ₹299", time: "05:00 PM" },
    { message: "Security alert: New login detected on your QuickPay account", time: "06:30 PM" },
    { message: "Your bank account is linked successfully to QuickPay", time: "07:15 PM" },
    { message: "QuickPay transaction of ₹1000 pending approval", time: "08:00 PM" },
];


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-6">📢 Notifications</h1>

      <div className="w-full max-w-2xl grid gap-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-[#6c5ce7] flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
            <span className="text-[#6c5ce7] text-xl">🔔</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
