import React from 'react'

const Footer = () => {
  return (
    <footer  className="bg-purple-700 text-white py-12 min-w-full">
    <div className="max-w-6xl mx-auto px-4">
      {/* Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8" >
        {/* About Section */}
        <div className="mb-8 md:mb-0" data-aos="fade-right">
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-300">
            We are the creators of the Digital Token System, a revolutionary platform designed to provide seamless and independent transaction environments for entities like colleges, offices, and events.
          </p>
        </div>
  
        {/* Quick Links */}
        <div className="mb-8 md:mb-0" data-aos="fade-right">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-gray-300 hover:text-white transition duration-300">Home</a>
            </li>
            <li>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition duration-300">How It Works</a>
            </li>
            <li>
              <a href="#why-choose-us" className="text-gray-300 hover:text-white transition duration-300">Why Choose Us</a>
            </li>
            <li>
              <a href="#contact" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
            </li>
          </ul>
        </div>
  
        {/* Contact Information */}
        <div className="mb-8 md:mb-0" data-aos="fade-left">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-gray-300">
              <span className="font-semibold">Email:</span> info@digitaltokensystem.com
            </li>
            <li className="text-gray-300">
              <span className="font-semibold">Phone:</span> +1 (123) 456-7890
            </li>
            <li className="text-gray-300">
              <span className="font-semibold">Address:</span> 123 Tech Street, Innovation City, IC 12345
            </li>
          </ul>
        </div>
  
        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-4" data-aos="fade-left">Follow Us</h3>
          <div className="flex space-x-4" data-aos="fade-left">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
  
      {/* Copyright Notice */}
      <div className="border-t border-purple-600 mt-8 pt-8 text-center">
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} Digital Token System. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
