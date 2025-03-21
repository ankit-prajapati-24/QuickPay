import React from 'react'
import contactmodel from '../auth/assets/contact-model.png'
const ContactUs = () => {
  return (
    <div id="contact" className="bg-white py-16">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
      {/* Contact Form and Information */}
      <div className="w-full md:w-1/2 md:pr-8">
        <h2 className="text-3xl font-bold text-[#6c5ce7] mb-8">Contact Us</h2>
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
          </div>
  
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>
  
          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your message"
            />
          </div>
  
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#6c5ce7] text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
  
        {/* Contact Information */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-[#6c5ce7] mb-4">Our Contact Info</h3>
          <ul className="space-y-2">
            <li className="text-gray-600">
              <span className="font-semibold">Email:</span> info@digitaltokensystem.com
            </li>
            <li className="text-gray-600">
              <span className="font-semibold">Phone:</span> +1 (123) 456-7890
            </li>
            <li className="text-gray-600">
              <span className="font-semibold">Address:</span> 123 Tech Street, Innovation City, IC 12345
            </li>
          </ul>
        </div>
      </div>
  
      {/* Model (Image) on the Right - Hidden on Small Screens */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 hidden md:block" data-aos="fade-left">
        <img
          src={contactmodel} // Replace with your model image path
          alt="Contact Us"
          className="w-full max-w-md mx-auto rounded-lg "
        />
      </div>
    </div>
  </div>
  )
}

export default ContactUs
