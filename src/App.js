import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import "./App.css";
import NavBar from "./component/common/navbar";
import Footer from "./component/common/Footer";
import AboutUs from "./component/pages/AboutUs";
import ContactUs from "./component/pages/ContactUs";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import HomePage from "./component/pages/homePage";
import UserDashboard from "./component/auth/user/UserDashboard";
import PaymentForm from "./component/auth/user/PaymentForm";
import UserTransactionHistory from "./component/auth/user/UserTransactionHistory";
import Scanner from "./component/auth/user/Scanner";
import VerifyOtp from './component/auth/VerifyOtp'
import MerchantDashboard from "./component/auth/merchant/MerchantDashboard";
import MerchantTransactionHistory from "./component/auth/merchant/MerchantHistory";
import MerchantHeader from "./component/auth/merchant/MerchantHeader";
import MerchantProfile from "./component/auth/merchant/MerchantProfile";

import AdminDashboard from "./component/auth/admin/adminDashboard";
import AdminSidebar from "./component/auth/admin/adminSidebar";
import Transactions from "./component/auth/admin/Transactions";
import ManageMerchants from "./component/auth/admin/ManageMerchants";
import ManageUsers from "./component/auth/admin/ManageUsers";
import RedemptionRequests from "./component/auth/admin/RedemptionRequests";
import DashboardHome from "./component/auth/admin/DashboardHome";
import ManageAdmins from "./component/auth/admin/ManageAdmins";
import Notification from "./component/auth/Notification";
import Profile from "./component/common/Profile";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { userdata, role } = useSelector((state) => state.User);

  return (
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        {role === "user" ? (
          <>
            <MerchantHeader merchantData={userdata} />
            <div className="flex flex-col md:flex-row flex-1 min-h-screen">
              <div className="flex-1 w-full mt-24  lg:mt-16 md:mt-16 ">
                <Routes>
                  <Route path="/user-dashboard" element={<UserDashboard userdata={userdata} />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/user/profile" element={<Profile userData={userdata} role={role} />} />
                  <Route path="/user/transactions" element={<MerchantTransactionHistory />} />
                  <Route path="/user/payment" element={<PaymentForm />} />
                  <Route path="/user/history" element={<UserTransactionHistory />} />
                  <Route path="/user/scan" element={<Scanner />} />
                  <Route path="/notification" element={<Notification />} />

                  <Route path="/*" element={<UserDashboard userdata={userdata} />} />
                </Routes>
              </div>
            </div>
          </>
        ) : role === "merchant" ? (
          <>
            <MerchantHeader merchantData={userdata} />
            <div className="flex flex-col md:flex-row flex-1 min-h-screen">
              <div className="flex-1 w-full ">
                <Routes>
                  <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/merchant/profile" element={<MerchantProfile merchantData={userdata} />} />
                  <Route path="/merchant/transactions" element={<MerchantTransactionHistory />} />
                  <Route path="/notification" element={<Notification />} />
                </Routes>
              </div>
            </div>
          </>
        ) : role === "admin" ? (
          <>
            <MerchantHeader merchantData={userdata}/>
            <div className="flex flex-row w-full min-h-screen">
              <AdminSidebar />
              <div className="flex-1 p-4 mt-24  lg:mt-12 md:mt-12">
                <Routes>
                  <Route path="/*" element={<DashboardHome />} />
                  <Route path="/admin/dashboard" element={<DashboardHome />} />
                  <Route path="/admin/users" element={<ManageUsers />} />
                  <Route path="/admin/admins" element={<ManageAdmins />} />
                  <Route path="/admin/profile" element={<Profile userData={userdata} role={role} />} />
                  <Route path="/admin/merchants" element={<ManageMerchants />} />
                  <Route path="/admin/transactions" element={<Transactions />} />
                  <Route path="/notification" element={<Notification />} />
                  <Route path="/admin/redemption-requests" element={<RedemptionRequests />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
            <NavBar />
            <div className="flex-grow p-6">
              <Routes>
                <Route path="/*" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/VerifyOtp" element={<VerifyOtp />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
  );
}

export default App;
