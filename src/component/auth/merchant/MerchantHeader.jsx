import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MerchantHeader = ({ merchantData }) => {
  const role = useSelector(state => state.User.role);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  // Define role-based routes
  const profileLink =
    role === "merchant" ? "/merchant/profile" :
    role === "user" ? "/user/profile" :
    "/admin/profile";

    const notificationsLink =
    role === "merchant" ? "/merchant/notifications" :
    role === "user" ? "/user/notifications" :
    "/admin/notifications";

  const settingsLink =
    role === "merchant" ? "/merchant/settings" :
    role === "user" ? "/user/settings" :
    "/admin/settings";

  // Define role-based display information
  const userInfo = role === "merchant" ? `Merchant ID: ${merchantData.merchantId}, Business: ${merchantData.businessType}` :
                   role === "user" ? "User Account" : "Admin Panel";

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role");
    navigate("/home", { replace: true });
    window.location.reload();
  };

  return (
    <header className="bg-[#6c5ce7] shadow-md p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo and Brand Name */}
        <div className="flex items-center">
          <button  className="lg:hidden mr-4 text-white">
            <FaBars className="text-2xl" />
          </button>
          <NavLink to="/merchant-Dashboard" className="text-2xl font-bold text-white">
            QuickPay
          </NavLink>
        </div>

        {/* Right Section: Search, Notifications, and Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center bg-white rounded-lg p-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-48 text-[#6c5ce7]"
            />
            <FaSearch className="text-[#6c5ce7]" />
          </div>

          {/* Notifications Icon */}
          <Link to={"/notification"} className="relative" >
            <FaBell className="text-2xl text-white cursor-pointer" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <FaUserCircle className="text-2xl text-white" />
              <span className="hidden lg:block text-white">Welcome, {merchantData?.name}!</span>
            </div>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-gray-600 border-b">{userInfo}</div>
                  <NavLink to={profileLink} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-[#6c5ce7]">
                    <FaUserCircle />
                    <span>Profile</span>
                  </NavLink>
                  {/* <NavLink to={settingsLink} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-[#6c5ce7]">
                    <FaCog />
                    <span>Settings</span>
                  </NavLink> */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 rounded-lg text-[#6c5ce7]"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MerchantHeader;