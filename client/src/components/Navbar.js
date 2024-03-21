import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a POST request to your backend logout endpoint
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local storage or session storage or any other client-side authentication data
        localStorage.removeItem("user"); // Assuming you store the user data in local storage
        // Redirect to the home page or any other desired page
        alert("Logout successful");
        navigate("/homepage");
      } else {
        // Handle error response from the server
        const data = await response.json();
        alert(data.message); // Show error message to the user
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle any other errors
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="bg-gray-700 text-white p-4 fixed w-full top-0 z-10">
      <div className="flex justify-between items-center">
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/homepage" className="hover:text-gray-300">
                &nbsp;&nbsp;Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-center text-2xl font-bold">
          <Link to="/dashboard" className="hover:text-gray-300">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ECVS
            DASHBOARD
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
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
              {/* <button onClick={handleLogout} className="hover:text-gray-300">
                Logout
              </button> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
