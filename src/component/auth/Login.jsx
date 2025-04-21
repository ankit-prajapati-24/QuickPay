import React, { useState, useEffect } from "react";
import loginModel from "../auth/assets/login-model-removebg.png"; // Replace with actual image
import { FaNodeJs, FaLock, FaDatabase } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { apiConnecter } from "../services/apiconnecter";
import { useNavigate } from "react-router-dom";
import { setRole, setToken, setuserdata } from "../../slices/UserSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    EventId: "",
    email: "",
    password: "",
    role: "user", // Default role is 'user'
  });
  const [error, setError] = useState("");

  // Thought bubbles data
  const bubbles = [
    {
      id: 1,
      x: "15%",
      y: "25%",
      text: "Digital Food Token System",
      icon: <FaNodeJs className="text-green-500 text-3xl" />,
    },
    {
      id: 2,
      x: "65%",
      y: "20%",
      text: "Secure Transactions with Razorpay",
      icon: <FaLock className="text-red-500 text-3xl" />,
    },
    {
      id: 3,
      x: "30%",
      y: "70%",
      text: "Admin, Coordinator & Merchant Roles",
      icon: <FaDatabase className="text-yellow-500 text-3xl" />,
    },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const storeData = async (API) => {

    try {
      const res = await apiConnecter("GET", `${API}/${formData.eventId}/${formData.email}`);
      const eventRes = await apiConnecter("GET",`https://eventpaymentsystem.onrender.com/data/eventname/${formData.eventId}`)
      const eventName = eventRes.data;
      console.log(res.data,eventName,'eventname');

      if (res.data && typeof res.data === "object") {
        dispatch(setuserdata({...res.data,eventName:eventName}));
        dispatch(setToken(res.data.gmail || "")); // Ensure token is correctly set
      } else {
        console.error("Invalid API response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
    console.log(formData);
    const toastId = toast.loading('Waiting......');
    try {
      const API = `https://eventpaymentsystem.onrender.com/${formData.role}/login/${formData.eventId}/${formData.email}/${formData.password}`;
      const res = await apiConnecter("GET", API, "", "", {
        eventId: formData.eventId,
        gmail: formData.email,
        password: formData.password,
      });
       console.log(res);
      //   toast.dismiss(toastId);
      if(res.data.rc == "02"){
        toast.error(`Your not a valid ${formData.role}`);
        return;
      }

      if (formData.role == 'user') {
        storeData(process.env.REACT_APP_USER_DATA);
        navigate("/User-Dashboard");
      } else if (formData.role == 'merchant') {
        storeData(process.env.REACT_APP_MERCHANT_DATA);
        navigate("/merchant-Dashboard");
      }
      else {
        storeData(process.env.REACT_APP_ADMIN_DATA);
        navigate("/admin/dashboard");
      }
      toast.success("login successfull!");
      dispatch(setRole(formData.role));

    } catch (err) {

      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
      console.error(err);
    } finally {
      toast.dismiss(toastId);

    }
    setError(""); // Clear any previous errors
  };

  const handleRoleSelection = (role) => {
    setFormData({ ...formData, role });
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen min-h-[800px] bg-gray-100 overflow-hidden">
      {/* Left Section - Login Illustration & Bubbles */}
      <div className="hidden lg:flex flex-1 items-center justify-center flex-col p-10 relative z-10">
        <div className="relative" data-aos="fade-right">
          <img
            src={loginModel}
            alt="Login Illustration"
            className="w-88 h-88 object-contain rounded-lg z-10"
            style={{ animation: `float 6s infinite ease-in-out` }}
          />
        </div>
        <div className="absolute inset-0 flex flex-wrap items-center justify-center">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="bg-white p-4 rounded-full shadow-lg text-center font-semibold text-purple-600 transition-transform transform hover:scale-110 flex flex-col justify-center items-center w-40 h-40 shadow-2xl"
              style={{ position: "absolute", left: bubble.x, top: bubble.y, animation: `float 6s infinite ease-in-out` }}
              data-aos="fade-up"
              data-aos-delay={bubble.id * 100}
            >
              {bubble.icon}
              <span className="text-sm text-gray-700 text-center px-2">{bubble.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-col items-center w-full h-full pt-20 max-w-md bg-white shadow-lg rounded-lg p-8 mx-auto lg:mx-0 lg:w-1/3 relative z-10" data-aos="fade-left">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to QuickPay! 🚀</h2>
        <p className="text-gray-600 mb-6 text-center">Please sign in to your account</p>

        <div className="flex space-x-2 justify-center mb-4" data-aos="fade-up" data-aos-delay="500">
          <button
            type="button"
            className={`p-3 rounded-lg transition-transform transform ${formData.role === "user" ? "bg-[#6c5ce7]  text-white" : "bg-gray-200"} w-28`}
            onClick={() => handleRoleSelection("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`p-3 rounded-lg transition-transform transform ${formData.role === "merchant" ? "bg-[#6c5ce7] text-white" : "bg-gray-200"} w-28`}
            onClick={() => handleRoleSelection("merchant")}
          >
            Merchant
          </button>
          <button
            type="button"
            className={`p-3 rounded-lg transition-transform transform ${formData.role === "admin" ? "bg-[#6c5ce7] text-white" : "bg-gray-200"} w-28`}
            onClick={() => handleRoleSelection("admin")}
          >
            Admin
          </button>
        </div>

        <input
          type="text"
          name="eventId"
          value={formData.eventId}
          onChange={handleChange}
          placeholder="Event Id"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          data-aos="fade-up"
          data-aos-delay="100"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
          data-aos="fade-up"
          data-aos-delay="200"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#6c5ce7]"
          data-aos="fade-up"
          data-aos-delay="300"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-[#6c5ce7] text-white p-3 rounded-lg hover:bg-[#6c5ce7]" onClick={handleSubmit} data-aos="fade-up" data-aos-delay="600">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
