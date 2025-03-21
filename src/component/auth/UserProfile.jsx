import React, { useState } from "react";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: "change-password", title: "Change Password" },
    { id: "update-information", title: "Update Information" },
    { id: "delete-account", title: "Delete Account" },
    { id: "check-balance", title: "Check Balance" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "change-password":
        return (
          <div>
            <h3 className="text-2xl font-bold text-[#6c5ce7] mb-4">Change Password</h3>
            <form className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
              >
                Update Password
              </button>
            </form>
          </div>
        );
      case "update-information":
        return (
          <div>
            <h3 className="text-2xl font-bold text-[#6c5ce7] mb-4">Update Information</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
              >
                Update Information
              </button>
            </form>
          </div>
        );
      case "delete-account":
        return (
          <div>
            <h3 className="text-2xl font-bold text-[#6c5ce7] mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <button className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600">
              Delete Account
            </button>
          </div>
        );
      case "check-balance":
        return (
          <div>
            <h3 className="text-2xl font-bold text-[#6c5ce7] mb-4">Check Balance</h3>
            <p className="text-gray-600 mb-4">
              Your current balance is: <span className="font-bold">$500.00</span>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen py-8 pt-16"> {/* Add pt-16 for navbar height */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Headings (Always visible on mobile) */}
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-6 mb-8 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold text-[#6c5ce7] mb-6">User Profile</h2>
            <ul className="space-y-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`w-full text-left p-3 rounded-lg ${
                      activeSection === section.id
                        ? "bg-purple-500 text-white"
                        : "bg-purple-50 text-[#6c5ce7] hover:bg-purple-100"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Content */}
          <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg p-6">
            {/* Go Back Button (Mobile Only) */}
            {activeSection && (
              <button
                className="md:hidden mb-6 text-purple-500 hover:text-[#6c5ce7]"
                onClick={() => setActiveSection(null)}
              >
                ← Go Back
              </button>
            )}

            {/* Render Content */}
            {activeSection ? renderContent() : (
              <p className="text-gray-600 text-center md:text-left">
                Select an option to view details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;