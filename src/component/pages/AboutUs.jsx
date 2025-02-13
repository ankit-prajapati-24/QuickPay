import React from "react";
import introductionmodel from '../auth/assets/about-us-model-removebg-preview.png';
import introductionmodel2 from '../auth/assets/who-we-model-new-removebg-preview.png';
import whowearemodel from '../auth/assets/thinking-girl-2-removebg-preview.png'
import ankit from '../auth/assets/2022_02_25_18_48_20.png'
const AboutUs = () => {
  // Sample developer data
  const developers = [
    {
      id: 1,
      name: "Ankit Kumar",
      role: "Frontend Developer",
      image: ankit, // Replace with actual image path
    },
    {
      id: 2,
      name: "Bhanu Teja",
      role: "Backend Developer",
      image: "/path/to/jane-smith.jpg", // Replace with actual image path
    }
  ];

  return (
    <div id="about-us" className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 w-full mx-auto overflow-hidden ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section 1: About the Website */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          {/* Model (Image) on the Left */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0" data-aos="fade-right">
            <img
              src={introductionmodel2} // Replace with your model image path
              alt="About the Website"
              className="w-full max-w-md mx-auto rounded-lg "
            />
          </div>

          {/* Content on the Right */}
          <div className="w-full md:w-1/2 md:pl-8" data-aos="fade-left">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">About the Website</h2>
            <p className="text-gray-600 mb-4">
              The Digital Token System is a revolutionary platform designed to provide seamless and independent transaction environments for entities like colleges, offices, and events. Our goal is to empower organizations to manage transactions efficiently without relying on traditional banking systems.
            </p>
            <p className="text-gray-600">
              With our platform, you can create a self-contained ecosystem where users and merchants can transact securely and effortlessly.
            </p>
          </div>
        </div>

        {/* Section 2: Who We Are */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-16">
          {/* Model (Image) on the Right */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0" data-aos="fade-left">
            <img
              src={whowearemodel}// Replace with your model image path
              alt="Who We Are"
              className="w-full max-w-md mx-auto rounded-lg "
            />
          </div>

          {/* Content on the Left */}
          <div className="w-full md:w-1/2 md:pr-8" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              We are a team of passionate developers, designers, and innovators dedicated to creating solutions that simplify and enhance everyday transactions. Our mission is to provide organizations with the tools they need to operate independently and efficiently.
            </p>
            <p className="text-gray-600">
              With years of experience in technology and finance, we are committed to delivering a platform that is secure, reliable, and user-friendly.
            </p>
          </div>
        </div>

        {/* Section 3: Our Developers */}
         {/* Section 3: Our Developers */}
         <div className="text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-8" data-aos="fade-up">
            Our Developers
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 h-full w-0.5 bg-purple-300 transform -translate-x-1/2 hidden md:block" />

            {/* Developer Cards */}
            {developers.map((developer, index) => (
              <div
                key={developer.id}
                className={`flex flex-col md:flex-row items-center justify-between mb-16 ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                {/* Developer Image */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <img
                    src={developer.image}
                    alt={developer.name}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto shadow-lg"
                  />
                </div>

                {/* Developer Details */}
                <div className="w-full md:w-1/2 md:px-8 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">
                    {developer.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{developer.role}</p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

  );
};

export default AboutUs;