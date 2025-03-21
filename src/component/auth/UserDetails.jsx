import React from "react";

const UserDetails = ({ user }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={user.profilePicture || "/path/to/default-profile-picture.png"} // Replace with default image path
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
        />
      </div>

      {/* User Name */}
      <h2 className="text-2xl font-bold text-[#6c5ce7] text-center mb-2">
        {user.name}
      </h2>

      {/* User Role */}
      <p className="text-gray-600 text-center mb-6">{user.role}</p>

      {/* User Details */}
      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-500 mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-500 mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <p className="text-gray-600">{user.phone || "Not provided"}</p>
        </div>

        {/* Address */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-500 mr-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-gray-600">
            {user.address || "Not provided"}
          </p>
        </div>
      </div>

      {/* Edit Profile Button (Optional) */}
      <div className="mt-8 text-center">
        <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserDetails;