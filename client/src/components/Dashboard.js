import React, { useState, useEffect } from "react";
import CertDisplay from "./CertDisplay";
import CertForm from "./CertForm";
import CertList from "./CertList";
import CertVerify from "./CertVerify";
import QrCodeReader from "./QrCodeReader";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("verify"); // Default to the verify view
  const [userRole, setUserRole] = useState("public"); // Default role
  const [username, setUsername] = useState(""); // Add state to store username

  useEffect(() => {
    // Retrieve the user's role from local storage safely
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.role) {
          setUserRole(user.role);
          setUsername(user.username); // Set the username
        }
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);

  const renderComponent = () => {
    switch (
      activeComponent
      // Keep your commented-out cases intact
      // case "list":
      //   return <CertList />;
      // case "display":
      //   return <CertDisplay />;
      // case "form":
      //   return <CertForm />;
      // case "verify":
      //   return <CertVerify />;
      // default:
      //   return <CertList />;
    ) {
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* User Profile Column */}
          <div className="md:col-span-3">
            <UserProfile />
          </div>
          {/* Main Content Column */}
          <div className="md:col-span-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <nav className="flex justify-between mb-6">
                {userRole === "admin" && (
                  <Link
                    to="/certform"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white order-first"
                  >
                    Add Certificate
                  </Link>
                )}
                <button
                  onClick={() => setActiveComponent("verify")}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white order-2"
                >
                  Verify Certificate
                </button>
                {userRole === "admin" && (
                  <button
                    onClick={() => setActiveComponent("list")}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white order-last"
                  >
                    List Certificates
                  </button>
                )}
              </nav>
              {/* Optional: Render component based on activeComponent */}
            </div>
          </div>
          {/* Optional: QR Code Reader Column */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
