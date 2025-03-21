import React, { useState, useEffect } from "react";
import { apiConnecter } from "../../services/apiconnecter";
import { useSelector } from "react-redux";
import { FaSpinner, FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import { FaEnvelope, FaWallet, FaMoneyBillWave, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const ManageMerchants = () => {
  const userData = useSelector((state) => state.User.userdata);
  const [merchants, setMerchants] = useState([]);
  const [search, setSearch] = useState("");
  const [newMerchant, setNewMerchant] = useState({
    eventId: "",
    name: "",
    gmail: "",
    password: "",
    mobile: "",
    merchantId: "",
    balance: 0,
  });
  const [showAddMerchantModal, setShowAddMerchantModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRedeem = (merchant) => {
    // Navigate to redemption-requests and pass merchant data as state
    navigate("/admin/redemption-requests", {
      state: {
        merchant,
      },
    });
  };

  // Fetch Merchants
  useEffect(() => {
    const fetchMerchants = async () => {
      setLoading(true);
      try {
        const response = await apiConnecter("GET", `${process.env.REACT_APP_ALL_MERCHANTS}/${userData?.eventId}`);
        setMerchants(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching merchants:", error);
        setError("Failed to fetch merchants. Please try again.");
        setMerchants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, []);

  // Add New Merchant
  const handleAddMerchant = async () => {
    if (
      !newMerchant.eventId ||
      !newMerchant.name ||
      !newMerchant.gmail ||
      !newMerchant.password ||
      !newMerchant.mobile ||
      !newMerchant.merchantId ||
      newMerchant.balance < 0
    ) {
      toast.error("Please enter valid merchant details.");
      return;
    }

    const toastId = toast.loading("adding New Merchant.....");

    try {
      const response = await apiConnecter("POST", "https://eventpaymentsystem.onrender.com/admin/add/merchant", newMerchant);
      setMerchants((prevMerchants) => [...prevMerchants, response.data]);
      setNewMerchant({ eventId: "", name: "", gmail: "", password: "", mobile: "", merchantId: "", balance: 0 });
      setShowAddMerchantModal(false);
      toast.dismiss(toastId);
      toast.success("Merchant added successfully.");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error while adding merchant");
      console.error("Error adding merchant:", error);
      setError("Failed to add merchant. Please try again.");
    }
  };

  return (
    <div className=" w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-[#6c5ce7] text-center mb-6">Manage Merchants</h1>

      {/* Search Bar and Add Merchant Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search Merchants"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => setShowAddMerchantModal(true)}
          className="bg-[#6c5ce7] text-white p-2 rounded flex items-center justify-center hover:bg-[#5a4acf] transition duration-300 w-1/3"
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

      {/* Show All Merchants */}
      {merchants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {merchants
            .filter((merchant) => merchant?.name?.toLowerCase().includes(search?.toLowerCase()))
            .map((merchant) => (
              <div
                key={merchant.merchantId}
                className="border border-gray-200 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                {/* Merchant Name */}
                <p className="font-bold text-2xl text-gray-800 mb-3">{merchant.name}</p>

                {/* Merchant Email */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaEnvelope className="mr-2 text-gray-500" />
                  <p>Email: {merchant.gmail}</p>
                </div>

                {/* Merchant Balance */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FaWallet className="mr-2 text-gray-500" />
                  <p>Balance: ${merchant.balance}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end mt-4 space-x-3">
                  {/* Redeem Button */}
                  <button
                    onClick={() => handleRedeem(merchant)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                  >
                    <FaMoneyBillWave className="mr-2" /> Redeem
                  </button>

                  {/* View Details Button */}
                  <button
                    onClick={() => {
                      // Add functionality to view merchant details
                    }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                  >
                    <FaEye className="mr-2" /> View
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No merchants found.</p>
      )}

      {/* Add New Merchant Modal */}
      {showAddMerchantModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Merchant</h2>
              <button onClick={() => setShowAddMerchantModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Event ID" value={newMerchant.eventId} onChange={(e) => setNewMerchant({ ...newMerchant, eventId: e.target.value })} className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]" />
              <input type="text" placeholder="Name" value={newMerchant.name} onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })} className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]" />
              <input type="email" placeholder="Email" value={newMerchant.gmail} onChange={(e) => setNewMerchant({ ...newMerchant, gmail: e.target.value })} className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]" />
              <input type="password" placeholder="Password" value={newMerchant.password} onChange={(e) => setNewMerchant({ ...newMerchant, password: e.target.value })} className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]" />
              <input type="text" placeholder="Mobile" value={newMerchant.mobile} onChange={(e) => setNewMerchant({ ...newMerchant, mobile: e.target.value })} className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]" />
              <input type="text" placeholder="Merchant ID" value={newMerchant.merchantId} onChange={(e) => setNewMerchant({ ...newMerchant, merchantId: e.target.value })} className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]" />
              <input type="number" placeholder="Balance" value={newMerchant.balance} onChange={(e) => setNewMerchant({ ...newMerchant, balance: e.target.value })} className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]" />
              <div className="flex justify-between mt-4">
                <button onClick={handleAddMerchant} className="bg-[#6c5ce7] text-white p-2 rounded hover:bg-[#5a4acf] transition duration-300 w-1/2">Add Merchant</button>
                <button onClick={() => setShowAddMerchantModal(false)} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition duration-300 w-1/2">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMerchants;