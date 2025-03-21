import React, { useState, useEffect } from "react";
import loginModel from "../auth/assets/login-model-removebg.png"; // Replace with actual image path
import { FaNodeJs, FaLock, FaDatabase } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignData } from "../../slices/UserSlice";
import {toast} from "react-hot-toast";
import { apiConnecter } from "../services/apiconnecter";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    eventId: "",
    eventName: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
  });

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
    AOS.init({ duration: 1000, once: false }); // once: false to allow repeated animations
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setError("Gmail and password are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setIsLoading(true); // Set loading state
    dispatch(setSignData(formData));
    const toastId = toast.loading('Sending OTP......');
    try {
      const res = await apiConnecter("POST", process.env.REACT_APP_EVENT_REGISTRATION, {
        eventId: formData.eventId,
        eventName: formData.eventName,
        adminName: formData.adminName,
        gmail: formData.email, // Change 'email' to 'gmail' as required by the API
        password: formData.password,
      });
      console.log(res);
    //   toast.dismiss(toastId);
      toast.success("Event registered successfully! Check your email for verification.");
      navigate("/VerifyOtp");
    } catch (err) {

      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
      console.error(err);
    } finally {
      toast.dismiss(toastId);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="relative flex flex-col lg:flex-row h-screen min-h-[800px] bg-gray-100 overflow-hidden">
      {/* Left Section - Illustration & Bubbles */}
      <div className="hidden lg:flex flex-1 items-center justify-center flex-col p-10 relative z-10">
        <div className="relative" data-aos="fade-right">
          <img
            src={loginModel}
            alt="Signup Illustration"
            className="w-88 h-88 object-contain rounded-lg z-10"
            style={{ animation: `float 6s infinite ease-in-out` }}
          />
        </div>
        <div className="absolute inset-0 flex flex-wrap items-center justify-center">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="bg-white p-4 rounded-full shadow-lg text-center font-semibold text-purple-600 transition-transform transform hover:scale-110 flex flex-col justify-center items-center w-40 h-40 shadow-2xl"
              style={{
                position: "absolute",
                left: bubble.x,
                top: bubble.y,
                animation: `float 6s infinite ease-in-out`,
              }}
              data-aos="fade-up"
              data-aos-delay={bubble.id * 100}
            >
              {bubble.icon}
              <span className="text-sm text-gray-700 text-center px-2">{bubble.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div
        className="flex flex-col items-center w-full h-full pt-20 max-w-md bg-white shadow-lg rounded-lg p-8 mx-auto lg:mx-0 lg:w-1/3 relative z-10"
        data-aos="fade-left"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register Your Event</h2>
        <p className="text-gray-600 mb-6 text-center">Join us and start your journey!</p>

        <input
          type="text"
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
          placeholder="Admin Name"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          data-aos="fade-up"
          data-aos-delay="100"
        />
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
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
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          data-aos="fade-up"
          data-aos-delay="200"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          data-aos="fade-up"
          data-aos-delay="300"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          data-aos="fade-up"
          data-aos-delay="400"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="w-full bg-[#6c5ce7] text text-white p-3 rounded-lg hover:bg-[#6c5ce7] cursor-pointer text disabled:bg-gray-400"
          onClick={handleSubmit}
          data-aos="fade-up"
          type="submit"
          disabled={loading}
          data-aos-delay="600"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
