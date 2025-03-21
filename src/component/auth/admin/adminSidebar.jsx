import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setToken,setuserdata,setRole } from "../../../slices/UserSlice";
import { FaHome, FaUsers, FaCog, FaStore, FaMoneyCheckAlt, FaListAlt, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    { path: "/admin/dashboard", icon: <FaHome />, label: "Dashboard" },
    { path: "/admin/users", icon: <FaUsers />, label: "Users" },
    { path: "/admin/merchants", icon: <FaStore />, label: "Merchants" },
    { path: "/admin/transactions", icon: <FaMoneyCheckAlt />, label: "Transactions" },
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
          <h1 className="text-xl font-bold text-[#6c5ce7]">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Role: Administrator</p>
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
            component={<Link to="/admin/dashboard" />}
            icon={<FaHome />}
            active={location.pathname === "/admin/dashboard"}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/users" />}
            icon={<FaUsers />}
            active={location.pathname === "/admin/users"}
          >
            Manage Users
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/merchants" />}
            icon={<FaStore />}
            active={location.pathname === "/admin/merchants"}
          >
            Manage Merchants
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/transactions" />}
            icon={<FaMoneyCheckAlt />}
            active={location.pathname === "/admin/transactions"}
          >
            Transactions
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/admins" />}
            icon={<FaStore />}
            active={location.pathname === "/admin/admins"}
          >
            Manage Admins
          </MenuItem>
          {/* <MenuItem
            component={<Link to="/admin/redemption-requests" />}
            icon={<FaListAlt />}
            active={location.pathname === "/admin/redemption-requests"}
          >
            Redemption Requests
          </MenuItem> */}
          {/* <MenuItem
            component={<Link to="/admin/settings" />}
            icon={<FaCog />}
            active={location.pathname === "/admin/settings"}
          >
            Settings
          </MenuItem> */}
        </Menu>

      
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

export default AdminSidebar;