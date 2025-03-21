import React, { useEffect, useState } from "react";
import { apiConnecter } from "../../services/apiconnecter";
import { useSelector } from "react-redux";
import { FaSpinner, FaUserShield, FaStore, FaUser } from "react-icons/fa";
import AdminInfo from "./AdminInfo";

const DashboardHome = () => {
    const userData = useSelector((state) => state.User.userdata);
    const [eventDetails, setEventDetails] = useState({
        eventId: userData?.eventId,
        eventName: userData?.eventName || "Tech Conference 2023",
    });

    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [merchants, setMerchants] = useState([]);
    const [users, setUsers] = useState([]);

    const getEventDetails = async () => {
        setLoading(true);
        try {
            const [adminsRes, merchantsRes, usersRes] = await Promise.all([
                apiConnecter("GET", `${process.env.REACT_APP_ALL_ADMINS}/${userData?.eventId}`),
                apiConnecter("GET", `${process.env.REACT_APP_ALL_MERCHANTS}/${userData?.eventId}`),
                apiConnecter("GET", `${process.env.REACT_APP_ALL_USERS}/${userData?.eventId}`),
            ]);

            setAdmins(adminsRes?.data || []);
            setMerchants(merchantsRes?.data || []);
            setUsers(usersRes?.data || []);
        } catch (e) {
            console.error("Error fetching data:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userData?.eventId) {
            getEventDetails();
        }
    }, [userData]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white p-3 w-full">

            <div className="flex items-center justify-center  p-3 bg-gray-100">
                <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Admin Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg  flex flex-col justify-center border border-gray-200 flex-1">
                        <AdminInfo adminData={userData} />
                    </div>

                    {/* Event Info Card (Gradient) */}
                    <div className="bg-gradient-to-r from-[#6c5ce7] to-[#8e7dff] text-white rounded-2xl shadow-lg p-8 flex flex-col justify-center flex-1">
                        <h2 className="text-2xl font-semibold">Current Event</h2>
                        <p className="mt-2 text-lg opacity-90">
                            Event ID: <span className="font-medium">{userData?.eventId || "N/A"}</span>
                        </p>
                        <p className="text-3xl font-bold mt-4">{userData?.eventName || "Udaan 2K25"}</p>
                    </div>
                </div>
            </div>


            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <FaSpinner className="animate-spin text-4xl text-[#6c5ce7]" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {[
                        { title: "Admins List", icon: <FaUserShield />, data: admins, color: "from-purple-400 to-indigo-500" },
                        { title: "Merchants List", icon: <FaStore />, data: merchants, color: "from-green-400 to-teal-500" },
                        { title: "Users List", icon: <FaUser />, data: users, color: "from-blue-400 to-cyan-500" },
                    ].map((section, index) => (
                        <div key={index} className={`p-6 rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-r ${section.color}`}>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                                {section.icon} {section.title}
                            </h2>
                            <ul className="space-y-3">
                                {section.data.length > 0 ? (
                                    section.data.map((item) => (
                                        <li key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-40 transition duration-300">
                                            <span className="text-black ">{item.name}</span>
                                            {section.title === "Users List" && <span className="text-sm text-gray-200">Balance: ${item.balance}</span>}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-200">No {section.title.toLowerCase()} available</p>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardHome;