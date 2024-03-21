import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center">
        <div className="mb-8 mr-12">
          <h2 className="text-lg font-bold text-white mb-4">ECVS</h2>
          <p className="text-gray-400">
            A new way to protect education certificates
          </p>
        </div>
        <div className="mb-8 mr-12">
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="text-gray-400">
            <li className="mb-2">
              <a href="/" className="hover:text-gray-200">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="/about" className="hover:text-gray-200">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="/services" className="hover:text-gray-200">
                Services
              </a>
            </li>
            <li className="mb-0">
              <a href="/contact" className="hover:text-gray-200">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-8 mr-12">
          {/* <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3> */}
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: hkengfai@gmail.com</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8">
        <p className="text-center text-gray-400">
          © {new Date().getFullYear()} ECVS Sdn Bhd. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
