import React, { useState, useEffect } from "react";
import loginModel from "../auth/assets/login-model-removebg.png"; // Replace with actual image
import logo from "../auth/assets/login-model-removebg.png"; // Replace with actual logo
import { FaReact, FaNodeJs, FaDatabase, FaLock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const AuthPage = () => {
  const url = window.location.pathname;
  console.log(url.includes("/Login"), url);
  const [isLogin, setIsLogin] = useState(url.includes("/Login"));

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

  return (
    <div className="relative flex flex-col lg:flex-row h-screen min-h-[800px] bg-gray-100 overflow-hidden">
      {/* Elliptical Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 clip-ellipse"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        {/* <img src={logo} alt="Logo" className="h-12" /> */}
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
        className="flex flex-col justify-center items-center w-full max-w-md bg-white shadow-lg rounded-lg p-8 mx-auto lg:mx-0 lg:w-1/3 relative z-10"
        data-aos="fade-left"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Welcome to QuickPay! 🚀" : "Create an Account"}
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          {isLogin ? "Please sign in to your account" : "Join us and start your journey!"}
        </p>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            data-aos="fade-up"
            data-aos-delay="100"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          data-aos="fade-up"
          data-aos-delay="200"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          data-aos="fade-up"
          data-aos-delay="300"
        />

        {isLogin && (
          <div
            className="flex flex-col md:flex-row justify-between w-full text-sm mb-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="#" className="text-purple-500 mt-2 md:mt-0">
              Forgot Password?
            </a>
          </div>
        )}

        <button
          className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {isLogin ? "LOGIN" : "SIGN UP"}
        </button>

        <p
          className="text-sm mt-4 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {isLogin ? "New on our platform?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-500 ml-1"
          >
            {isLogin ? "Create an account" : "Login"}
          </button>
        </p>

        <div
          className="flex justify-center space-x-4 mt-4"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <button className="bg-blue-500 text-white p-2 rounded-full">F</button>
          <button className="bg-gray-900 text-white p-2 rounded-full">G</button>
          <button className="bg-red-500 text-white p-2 rounded-full">G+</button>
        </div>
      </div>

      {/* Floating Animation & Ellipse Styling */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .clip-ellipse {
            clip-path: ellipse(80% 50% at 50% 50%);
          }
        `}
      </style>
    </div>
  );
};

export default AuthPage;