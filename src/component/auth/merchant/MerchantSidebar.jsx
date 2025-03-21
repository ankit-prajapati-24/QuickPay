import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaHome, FaStore, FaMoneyCheckAlt, FaListAlt, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setToken,setuserdata,setRole } from "../../../slices/UserSlice";

const MerchantSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

   function handleLogout() {
      dispatch(setToken(""));
      dispatch(setuserdata({}));
      dispatch(setRole(""));
      
      localStorage.removeItem("token"); // Clear stored token
      sessionStorage.removeItem("role");
      
      navigate("/home", { replace: true });
      window.location.reload(); // Ensure UI updates correctly
    }

  // Menu items for bottom navigation
  const bottomNavItems = [
    { path: "/merchant/dashboard", icon: <FaHome />, label: "Dashboard" },
    { path: "/merchant/transactions", icon: <FaMoneyCheckAlt />, label: "Transactions" },
    { path: "/merchant/redemption-requests", icon: <FaListAlt />, label: "Redemption" },
    { path: "/merchant/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#6c5ce7] text-white rounded-lg lg:hidden"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        className="h-screen bg-[#f8f9fa] shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out"
        breakPoint="lg" // Collapse sidebar on screens smaller than lg (1024px)
        onToggle={() => setCollapsed(!collapsed)}
      >
        {/* Top Section - Website Name & Role */}
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold text-[#6c5ce7]">Merchant Dashboard</h1>
          <p className="text-sm text-gray-600">Role: Merchant</p>
        </div>

        {/* Sidebar Menu */}
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? "#ccc" : "#6c5ce7",
                  backgroundColor: active ? "#e9ecef" : undefined,
                  "&:hover": {
                    backgroundColor: "#6c5ce710",
                  },
                };
            },
          }}
        >
          <MenuItem
            component={<Link to="/merchant/dashboard" />}
            icon={<FaHome />}
            active={location.pathname === "/merchant/dashboard"}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={<Link to="/merchant/transactions" />}
            icon={<FaMoneyCheckAlt />}
            active={location.pathname === "/merchant/transactions"}
          >
            Transactions
          </MenuItem>
          <MenuItem
            component={<Link to="/merchant/redemption-requests" />}
            icon={<FaListAlt />}
            active={location.pathname === "/merchant/redemption-requests"}
          >
            Redemption Requests
          </MenuItem>
          <MenuItem
            component={<Link to="/merchant/settings" />}
            icon={<FaCog />}
            active={location.pathname === "/merchant/settings"}
          >
            Settings
          </MenuItem>
        </Menu>

        {/* Bottom User Section */}
        
        <div className="p-4">
          <div
            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-[#6c5ce710] transition-colors duration-200"
            onClick={() => setShowLogout(!showLogout)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-[#6c5ce7]"
            />
            {!collapsed && <span className="text-[#6c5ce7] font-medium">Merchant</span>}
          </div>

          {/* Logout Option */}
          { (
            <div onClick={handleLogout} className="mt-2 bg-white shadow-lg p-2 rounded-lg">
              <button className="flex items-center gap-2 text-red-500 p-2 w-full hover:bg-red-100 rounded-md transition-colors duration-200">
                <FaSignOutAlt /> {!collapsed && "Logout"}
              </button>
            </div>
          )}
        </div>
        
      </Sidebar>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden z-50">
        <div className="flex justify-around p-2">
          {bottomNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg ${
                location.pathname === item.path ? "text-[#6c5ce7]" : "text-gray-600"
              } hover:text-[#6c5ce7] transition-colors duration-200`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantSidebar;