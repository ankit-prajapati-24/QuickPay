import React, { useState, useEffect } from "react";
import loginModel from "../auth/assets/login-model-removebg.png"; // Replace with actual image
import { FaNodeJs, FaLock, FaDatabase } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin component
import { useGoogleOneTapLogin,useGoogleLogin } from '@react-oauth/google';

const AuthPage = () => {
  const url = window.location.pathname;
  const [isLogin, setIsLogin] = useState(url.includes("/Login"));
  const [formData, setFormData] = useState({
    EventId:"",
    EventName:"",
    AdminName: "",
    email: "",
    password: "",
    
    confirmPassword: "",
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

  useEffect(() => {
    setIsLogin(url.includes("/Login"));
  }, [url]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Here you can save or send data to backend
    console.log(formData);
    setError(""); // Clear any previous errors
  };

  const handleRoleSelection = (role) => {
    setFormData({ ...formData, role });
  };

  const handleGoogleLogin = (response) => {
    console.log("Google login response:", response);
    // Here you can send the token to your backend for authentication
    // If the token is valid, you can log the user in
  };

  return (
    <div className="relative flex flex-col lg:flex-row h-screen min-h-[800px] bg-gray-100 overflow-hidden">
      {/* Elliptical Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 clip-ellipse"></div>
      </div>

      {/* Left Section - Login Illustration & Bubbles */}
      <div className="hidden lg:flex flex-1 items-center justify-center flex-col p-10 relative z-10">
        {/* Image Illustration */}
        <div className="relative" data-aos="fade-right">
          <img
            src={loginModel}
            alt="Login Illustration"
            className="w-88 h-88 object-contain rounded-lg z-10"
            style={{
              animation: `float 6s infinite ease-in-out`,
            }}
          />
        </div>

        {/* Thought Bubbles */}
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
              data-aos-delay={bubble.id * 100} // Staggered animation
            >
              {bubble.icon}
              <span className="text-sm text-gray-700 text-center px-2">{bubble.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div
        className="flex flex-col  items-center w-full h-full pt-20 max-w-md bg-white shadow-lg rounded-lg p-8 mx-auto lg:mx-0 lg:w-1/3 relative z-10"
        data-aos="fade-left"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Welcome to QuickPay! 🚀" : "Ragister Your Event"}
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          {isLogin ? "Please sign in to your account" : "Join us and start your journey!"}
        </p>

        {
          isLogin && <>
             {/* Role Selection Buttons */}
        <div className="flex space-x-4 justify-center mb-4" data-aos="fade-up" data-aos-delay="500">
          <button
            type="button"
            className={`p-3 rounded-lg transition-transform transform ${formData.role === "user" ? "bg-purple-500 text-white" : "bg-gray-200"} w-28`}
            onClick={() => handleRoleSelection("user")}
            style={{ animation: formData.role === "user" ? "move-together 1s ease-in-out" : "" }}
          >
            User
          </button>
          <button
            type="button"
            className={`p-3 rounded-lg transition-transform transform ${formData.role === "merchant" ? "bg-purple-500 text-white" : "bg-gray-200"} w-28`}
            onClick={() => handleRoleSelection("merchant")}
            style={{ animation: formData.role === "merchant" ? "move-together 1s ease-in-out" : "" }}
          >
            Merchant
          </button>
          <button
            type="button"
            className={`p-3 rounded-lg transition-transform transform ${formData.role === "admin" ? "bg-purple-500 text-white" : "bg-gray-200"} w-28`}
            onClick={() => handleRoleSelection("admin")}
            style={{ animation: formData.role === "admin" ? "move-together 1s ease-in-out" : "" }}
          >
            Admin
          </button>
        </div>
          </>
        }

        {!isLogin && (
          <>

          <input
            type="text"
            name="AdminName"
            value={formData.AdminName}
            onChange={handleChange}
            placeholder="Admin Name"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            data-aos="fade-up"
            data-aos-delay="100"
          />
            <input
            type="text"
            name="EventName"
            value={formData.EventName}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            data-aos="fade-up"
            data-aos-delay="100"
          />
          </>
        )}

        {
          isLogin &&  <input
            type="text"
            name="EventId"
            value={formData.EventId}
            onChange={handleChange}
            placeholder="Event Id"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            data-aos="fade-up"
            data-aos-delay="100"
          />
        }

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

        {!isLogin && (
          <>
            
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
          </>
        )}

       

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
          onClick={handleSubmit}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {isLogin ? "LOGIN" : "Ragister"}
        </button>

        <p
          className="text-sm mt-4 text-center"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          {isLogin ? "New on our platform?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-500 ml-1"
          >
            {isLogin ? "Ragister" : "Login"}
          </button>
        </p>

        {/* Google Login Button */}
      {isLogin &&  <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error) => console.log("Google Login Error:", error)}
            useOneTap
          />
        </div>}
      </div>

      {/* Floating Animation & Ellipse Styling */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }

          @keyframes move-together {
            0% { transform: translateX(0); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(0); }
          }

          .clip-ellipse {
            clip-path: ellipse(60% 60% at 50% 50%);
          }
        `}
      </style>
    </div>
  );
};

export default AuthPage;
