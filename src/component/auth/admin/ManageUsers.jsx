import React, { useState, useEffect } from "react";
import { apiConnecter } from "../../services/apiconnecter";
import { useSelector } from "react-redux";
import { FaSpinner, FaSearch, FaPlus, FaTimes, FaMoneyBillWave } from "react-icons/fa";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const userData = useSelector((state) => state.User.userdata);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLoadMoneyModal, setShowLoadMoneyModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadMoneyData, setLoadMoneyData] = useState({
    eventId: userData?.eventId || "",
    adminName: userData?.name || "",
    adminGmail: userData?.gmail || "",
    receiverGmail: "",
    amount: 0,
    desc: "",
  });
  const [addUserData, setAddUserData] = useState({
    eventId: userData?.eventId || "",
    name: "",
    gmail: "",
    password: "",
    pin: "",
    mobile: "",
    balance: 0,
  });

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await apiConnecter("GET", `${process.env.REACT_APP_ALL_USERS}/${userData?.eventId}`);
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [userData]);

  // Open Load Money Modal
  const openLoadMoneyModal = (user) => {
    setSelectedUser(user);
    setLoadMoneyData({
      ...loadMoneyData,
      receiverGmail: user.gmail,
    });
    setShowLoadMoneyModal(true);
  };

  // Handle Load Money
  const handleLoadMoney = async () => {
    if (!loadMoneyData.amount || loadMoneyData.amount <= 0 || !loadMoneyData.desc) {
      alert("Please enter a valid amount and description.");
      return;
    }
    const toastId = toast.loading("Loading money...");
    try {
      const response = await apiConnecter("POST", "https://eventpaymentsystem.onrender.com/admin/load-user-wallet", loadMoneyData);
      toast.dismiss(toastId);
      toast.success("Money loaded successfully!");
      setShowLoadMoneyModal(false);
      // Update the user's balance in the UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.gmail === selectedUser.gmail
            ? { ...user, balance: user.balance + loadMoneyData.amount }
            : user
        )
      );
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error loading money:");
      setError("Failed to load money. Please try again.");
    }
  };

  // Handle Add User
  const handleAddUser = async () => {
    if (!addUserData.name || !addUserData.gmail || !addUserData.password || !addUserData.pin || !addUserData.mobile) {
      alert("Please fill all the fields.");
      return;
    }

    const toastId = toast.loading("adding user...");

    try {
      const response = await apiConnecter("POST", "https://eventpaymentsystem.onrender.com/admin/add/user", addUserData);
      toast.dismiss(toastId);
      toast.success("User added successfully!");
      setShowAddUserModal(false);
      // Refresh the users list
      const fetchResponse = await apiConnecter("GET", `${process.env.REACT_APP_ALL_USERS}/${userData?.eventId}`);
      setUsers(Array.isArray(fetchResponse.data) ? fetchResponse.data : []);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error adding user:");
      setError("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-[#6c5ce7] text-center mb-6">Manage Users</h1>

      {/* Search Bar and Add User Button */}
      <div className="flex mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search Users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="ml-4 bg-[#6c5ce7] text-white p-2 rounded flex items-center justify-center hover:bg-[#5a4acf] transition duration-300"
        >
          <FaPlus className="mr-2" /> Add
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <FaSpinner className="animate-spin text-4xl text-[#6c5ce7]" />
        </div>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Show All Users */}
      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {users
            .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
            .map((user) => (
              <div
                key={user.id}
                className="border p-6 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#ffffff] to-[#f0f4ff] border-gray-200"
              >
                {/* User Details */}
                <div className="flex flex-col items-center space-y-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name || "N/A"}&size=128&background=6c5ce7&color=fff`}
                    alt={user?.name || "N/A"}
                    className="h-16 w-16 rounded-full border-4 border-white shadow-md"
                  />
                  <p className="font-bold text-xl text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">Email: {user.gmail}</p>
                  <p className="text-sm text-gray-600">Balance: ${user.balance}</p>
                </div>

                {/* Load Money Button */}
                <button
                  onClick={() => openLoadMoneyModal(user)}
                  className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                >
                  <FaMoneyBillWave className="mr-2" /> Load Money
                </button>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No users found.</p>
      )}

      {/* Load Money Modal */}
      {showLoadMoneyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Load Money</h2>
              <button onClick={() => setShowLoadMoneyModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Amount"
                value={loadMoneyData.amount}
                onChange={(e) => setLoadMoneyData({ ...loadMoneyData, amount: parseInt(e.target.value) })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <textarea
                placeholder="Description"
                value={loadMoneyData.desc}
                onChange={(e) => setLoadMoneyData({ ...loadMoneyData, desc: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
                rows="3"
              />
              <div className="flex justify-between mt-4">
                <button onClick={handleLoadMoney} className="bg-[#6c5ce7] text-white p-2 rounded hover:bg-[#5a4acf] transition duration-300 w-1/2">
                  Load Money
                </button>
                <button onClick={() => setShowLoadMoneyModal(false)} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition duration-300 w-1/2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add User</h2>
              <button onClick={() => setShowAddUserModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={addUserData.name}
                onChange={(e) => setAddUserData({ ...addUserData, name: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <input
                type="email"
                placeholder="Email"
                value={addUserData.gmail}
                onChange={(e) => setAddUserData({ ...addUserData, gmail: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <input
                type="password"
                placeholder="Password"
                value={addUserData.password}
                onChange={(e) => setAddUserData({ ...addUserData, password: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <input
                type="text"
                placeholder="PIN"
                value={addUserData.pin}
                onChange={(e) => setAddUserData({ ...addUserData, pin: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <input
                type="text"
                placeholder="Mobile"
                value={addUserData.mobile}
                onChange={(e) => setAddUserData({ ...addUserData, mobile: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <input
                type="number"
                placeholder="Balance"
                value={addUserData.balance}
                onChange={(e) => setAddUserData({ ...addUserData, balance: parseInt(e.target.value) })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <div className="flex justify-between mt-4">
                <button onClick={handleAddUser} className="bg-[#6c5ce7] text-white p-2 rounded hover:bg-[#5a4acf] transition duration-300 w-1/2">
                  Add User
                </button>
                <button onClick={() => setShowAddUserModal(false)} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition duration-300 w-1/2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;