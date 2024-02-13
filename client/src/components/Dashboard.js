import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

function Dashboard() {
  const [userRole, setUserRole] = useState("public");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.role);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <UserProfile />
          </div>
          <div className="md:col-span-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h1 className="text-xl font-semibold text-center mb-6">
                Education Certificate Verifier System (ECVS)
              </h1>
              <nav className="flex justify-between mb-6">
                {userRole === "admin" && (
                  <Link
                    to="/certform"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white order-first"
                  >
                    Add Certificate
                  </Link>
                )}
                <Link
                  to="/certverify"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white order-2"
                >
                  Verify Certificates
                </Link>
                {userRole === "admin" && (
                  <Link
                    to="/certlist"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white order-last"
                  >
                    List Certificates
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
