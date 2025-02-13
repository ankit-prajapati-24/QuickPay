import React, { useEffect } from "react";
import Navbar from '../common/navbar';
import namastemodel from '../auth/assets/namaste-model.png'
import heromodel from '../auth/assets/_EC987E44-752A-45FD-9DC4-E416EA5F1033_-removebg-preview.png';
import 'aos/dist/aos.css'; // Import AOS styles
import whyusmodel from '../auth/assets/who-we-are-girl-model-.png'
import AboutUs from "./AboutUs";
import Footer from "../common/Footer";

const HomePage = () => {
  // Initialize AOS
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({
        duration: 1000, // Animation duration
        // once: true, // Whether animation should happen only once
      });
    });
  }, []);

  return (
    <div className="min-w-full bg-gradient-to-r from-purple-50 to-blue-50 border mx-auto overflow-hidden">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-row items-center">
        {/* Text Content */}
        <div className="w-1/2 pr-8" data-aos="fade-right">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-700 mb-6">
            Revolutionize Transactions in Your Environment
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
            A decentralized digital token system for colleges, offices, events, and more.
            Manage transactions seamlessly without relying on traditional banking systems.
          </p>
          <div className="space-x-4 space-y-2">
            <button className="bg-purple-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-purple-800 transition duration-300">
              Get Started
            </button>
            <button className="bg-white text-purple-700 px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-purple-700 hover:bg-purple-50 transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Image (Model) */}
        <div className="w-1/2" data-aos="fade-left">
          <img
            src={namastemodel}
            alt="Login Illustration"
            className="w-full max-h-96 h-auto object-contain rounded-lg"
            style={{
              animation: `float 6s infinite ease-in-out`,
            }}
          />
        </div>
      </div>

    


      <div id="how-it-works" className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-purple-700 text-center mb-8 md:mb-16" data-aos="fade-up">
      How It Works
    </h2>
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 h-full w-0.5 bg-purple-300 transform -translate-x-1/2 hidden md:block" />

      {/* Step 1: Left Side */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16" data-aos="fade-right">
        {/* Content */}
        <div className="w-full md:w-1/2 md:pr-8 text-center md:text-left">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
            <span className="text-white text-lg md:text-2xl font-bold">1</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-2 md:mb-4">Admin Registers Entity</h3>
          <p className="text-sm md:text-base text-gray-600">
            The admin registers their entity (college, office, event) with a unique name in the system.
          </p>
        </div>
        {/* Spacer */}
        <div className="w-1/2 hidden md:block" />
      </div>

      {/* Step 2: Right Side */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-8 md:mb-16" data-aos="fade-left">
        {/* Content */}
        <div className="w-full md:w-1/2 md:pl-8 text-center md:text-right">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
            <span className="text-white text-lg md:text-2xl font-bold">2</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-2 md:mb-4">Admin Manages Users and Merchants</h3>
          <p className="text-sm md:text-base text-gray-600">
            The admin adds users and merchants to the environment, loads digital tokens into user wallets, and monitors all transactions.
          </p>
        </div>
        {/* Spacer */}
        <div className="w-1/2 hidden md:block" />
      </div>

      {/* Step 3: Left Side */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-16" data-aos="fade-right">
        {/* Content */}
        <div className="w-full md:w-1/2 md:pr-8 text-center md:text-left">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-700 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
            <span className="text-white text-lg md:text-2xl font-bold">3</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-purple-700 mb-2 md:mb-4">Users and Merchants Transact</h3>
          <p className="text-sm md:text-base text-gray-600">
            Users transact with digital tokens within the environment, and merchants redeem tokens for real cash from the admin.
          </p>
        </div>
        {/* Spacer */}
        <div className="w-1/2 hidden md:block" />
      </div>
    </div>
  </div>
</div>


      {/* Call-to-Action Section */}
      <div className="bg-purple-700 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6" data-aos="fade-up">
            Ready to Transform Your Environment?
          </h2>
          <p className="text-lg text-purple-100 mb-8" data-aos="fade-up" data-aos-delay="200">
            Join the Digital Token System today and experience seamless, independent
            transactions.
          </p>
          <button
            className="bg-white text-purple-700 px-8 py-3 rounded-lg hover:bg-purple-50 transition duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Get Started Now
          </button>
        </div>
      </div>

    

      <div id="why-choose-us" className="bg-gradient-to-r from-purple-50 to-blue-50 py-16">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
    {/* Model (Image) on the Left - Hidden on Small Screens */}
    <div className="w-full md:w-1/2 mb-8 md:mb-0 hidden md:block" data-aos="fade-right">
      <img
        src={whyusmodel} // Replace with your model image path
        alt="Why Choose Us"
        className="w-full max-w-md mx-auto rounded-lg "
      />
    </div>

    {/* Key Points on the Right */}
    <div className="w-full md:w-1/2 md:pl-8" data-aos="fade-left">
      <h2 className="text-3xl font-bold text-purple-700 mb-8">
        Why Choose Us?
      </h2>
      <ul className="space-y-6">
        {/* Point 1 */}
        <li className="flex items-start">
          <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Independent Transaction Environment</h3>
            <p className="text-gray-600">
              Our system operates independently, allowing transactions without relying on traditional banking systems.
            </p>
          </div>
        </li>

        {/* Point 2 */}
        <li className="flex items-start">
          <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Seamless User Experience</h3>
            <p className="text-gray-600">
              Users and merchants can transact seamlessly with a simple and intuitive interface.
            </p>
          </div>
        </li>

        {/* Point 3 */}
        <li className="flex items-start">
          <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Secure and Reliable</h3>
            <p className="text-gray-600">
              Our platform ensures secure transactions with robust encryption and real-time monitoring.
            </p>
          </div>
        </li>

        {/* Point 4 */}
        <li className="flex items-start">
          <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Admin Control</h3>
            <p className="text-gray-600">
              Admins have full control over users, merchants, and transactions, ensuring a smooth operation.
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>


    </div>
  );
};

export default HomePage;