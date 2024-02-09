// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Homie
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-gray-300">
            Register
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">
            ECVS
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
