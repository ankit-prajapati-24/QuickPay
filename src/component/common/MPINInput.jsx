import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MPINInput = () => {
  const [mpin, setMPIN] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
    
  function onMPINSubmit(){
       return true;
    }
  const handleNumberClick = (number) => {
    if (mpin.length < 4) {
      setMPIN(mpin + number);
      setError(""); // Clear any previous error
    }
  };

  const handleBackspace = () => {
    setMPIN(mpin.slice(0, -1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mpin.length === 4) {
      setIsLoading(true);
      const isValid = await onMPINSubmit(mpin); // Simulate an API call
      if (!isValid) {
        setError("Invalid MPIN. Please try again.");
      } else {
        setError(""); // Clear error on successful validation
        navigate("/ShowBalance"); // Redirect to Show Balance page
      }
      setIsLoading(false);
    } else {
      setError("Please enter a valid 4-digit MPIN.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Enter Your MPIN
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">{error}</p>
        )}

        {/* Display MPIN Input */}
        <div className="flex justify-center mb-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 border-2 border-gray-300 rounded-lg mx-2 flex items-center justify-center text-2xl font-bold text-gray-700"
            >
              {mpin[index] || ""}
            </div>
          ))}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number.toString())}
              className="p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 text-2xl font-bold text-gray-700"
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 text-2xl font-bold text-gray-700"
          >
            ←
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 text-2xl font-bold text-gray-700"
          >
            0
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || mpin.length !== 4}
          className="w-full mt-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-xl hover:from-blue-700 hover:to-[#6c5ce7] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MPINInput;