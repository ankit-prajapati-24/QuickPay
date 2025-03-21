import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaQrcode, FaHome, FaPlusCircle, FaClipboardList, FaSignOutAlt, FaBars } from "react-icons/fa";

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#d359ff] text-white rounded-lg lg:hidden"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        className="h-screen bg-[#eecef9] shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out"
        breakPoint="lg" // Collapse sidebar on screens smaller than lg (1024px)
        onToggle={() => setCollapsed(!collapsed)}
      >
        {/* Top Section - Website Name & Role */}
        <div className="p-4 text-center">
          <h1 className="text-xl font-bold text-[#d359ff]">Digital Token</h1>
          <p className="text-sm text-gray-600">User Role: Admin</p>
        </div>

        {/* Sidebar Menu */}
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#d359ff",
                  backgroundColor: active ? "#eecef9" : undefined,
                  "&:hover": {
                    backgroundColor: "#d359ff20",
                  },
                };
            },
          }}
        >
          <MenuItem component={<Link to="/dashboard" />} icon={<FaHome />}>
            Dashboard
          </MenuItem>
          <MenuItem component={<Link to="/generate-token" />} icon={<FaPlusCircle />}>
            Generate Token
          </MenuItem>
          <MenuItem component={<Link to="/my-tokens" />} icon={<FaClipboardList />}>
            My Tokens
          </MenuItem>
          <MenuItem component={<Link to="/scan" />} icon={<FaQrcode />}>
            Scan QR Code
          </MenuItem>
        </Menu>

        {/* Bottom User Section */}
        <div className="p-4">
          <div
            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-[#d359ff]/20 transition-colors duration-200"
            onClick={() => setShowLogout(!showLogout)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-[#d359ff]"
            />
            {!collapsed && <span className="text-[#d359ff] font-medium">John Doe</span>}
          </div>

          {/* Logout Option */}
          {showLogout && (
            <div className="mt-2 bg-white shadow-lg p-2 rounded-lg">
              <button className="flex items-center gap-2 text-red-500 p-2 w-full hover:bg-red-100 rounded-md transition-colors duration-200">
                <FaSignOutAlt /> {!collapsed && "Logout"}
              </button>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default UserSidebar;