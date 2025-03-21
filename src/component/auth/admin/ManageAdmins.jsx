import React, { useState, useEffect } from "react";
import { apiConnecter } from "../../services/apiconnecter";
import { useSelector } from "react-redux";
import { FaSpinner, FaSearch, FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
// import Avatar from "react-avatar";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ManageAdmins = () => {
  const userData = useSelector((state) => state.User.userdata);
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    eventId: userData?.eventId || "",
    gmail: "",
    password: "",
    name: "",
    adminType: false, // Always false for sub-admins
  });
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Admins
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const response = await apiConnecter("GET", `${process.env.REACT_APP_ALL_ADMINS}/${userData?.eventId}`);
        setAdmins(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching admins:", error);
        setError("Failed to fetch admins. Please try again.");
        setAdmins([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, [userData]);

  // Add New Admin
  const handleAddAdmin = async () => {
    if (!newAdmin.eventId || !newAdmin.gmail || !newAdmin.password || !newAdmin.name) {
       toast.error("Please enter valid admin details.");
      return;
    }
    const toastId = toast.loading("Please wait.....");

    try {
      const response = await apiConnecter("POST", "https://eventpaymentsystem.onrender.com/admin/add/admin", newAdmin);
      setAdmins((prevAdmins) => [...prevAdmins, response.data]);
      setNewAdmin({ eventId: userData?.eventId || "", gmail: "", password: "", name: "", adminType: false });
      setShowAddAdminModal(false);
      toast.dismiss(toastId);
      toast.success("Admin added successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An error occurred while adding user");
      console.error("Error adding admin:", error);
      setError("Failed to add admin. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-[#6c5ce7] text-center mb-6">Manage Admins</h1>

      {/* Search Bar and Add Admin Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search Admins"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddAdminModal(true)}
          className="bg-[#6c5ce7] text-white p-2 rounded flex items-center justify-center hover:bg-[#5a4acf] transition duration-300 w-1/3"
        >
          <FaPlus className="mr-2" /> Add New Admin
        </motion.button>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <FaSpinner className="animate-spin text-4xl text-[#6c5ce7]" />
        </div>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Show All Admins */}
      {admins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {admins
    .filter((admin) => admin?.name?.toLowerCase().includes(search?.toLowerCase()))
    .map((admin) => (
      <motion.div
        key={admin.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border p-6 rounded-xl hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#ffffff] to-[#f0f4ff] border-gray-200"
      >
        {/* Admin Avatar and Details */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={`https://ui-avatars.com/api/?name=${admin?.name || "N/A"}&size=128&background=6c5ce7&color=fff`}
            alt={admin?.name || "N/A"}
            className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-center">
            <p className="font-bold text-2xl text-gray-800">{admin.name}</p>
            <p className="text-sm text-gray-600">Email: {admin.gmail}</p>
            <p className="text-sm text-gray-600">
              Role: {admin.adminType ? "Main Admin" : "Sub Admin"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <FaEdit className="mr-2" />
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <FaTrash className="mr-2" />
            Delete
          </motion.button>
        </div>
      </motion.div>
    ))}
</div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No admins found.</p>
      )}

      {/* Add New Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Admin</h2>
              <button onClick={() => setShowAddAdminModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event ID"
                value={newAdmin.eventId}
                onChange={(e) => setNewAdmin({ ...newAdmin, eventId: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
                disabled
              />
              <input
                type="text"
                placeholder="Name"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <input
                type="email"
                placeholder="Email"
                value={newAdmin.gmail}
                onChange={(e) => setNewAdmin({ ...newAdmin, gmail: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
              />
              <div className="flex justify-between mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddAdmin}
                  className="bg-[#6c5ce7] text-white p-2 rounded hover:bg-[#5a4acf] transition duration-300 w-1/2"
                >
                  Add Admin
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddAdminModal(false)}
                  className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition duration-300 w-1/2"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;