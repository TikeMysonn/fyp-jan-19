import React, { useState } from "react";
import CertDisplay from "./CertDisplay";
import CertForm from "./CertForm";
import CertList from "./CertList";
import CertVerify from "./CertVerify";
import QrCodeReader from "./QrCodeReader";
import UserProfile from "./UserProfile";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("list"); // Default to the list view

  const renderComponent = () => {
    switch (
      activeComponent
      //   case "display":
      //     return <CertDisplay />;
      //   case "form":
      //     return <CertForm />;
      //   case "list":
      //     return <CertList />;
      //   case "verify":
      //     return <CertVerify />;
      //   default:
      //     return <CertList />;
    ) {
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* User Profile Column */}
          <div className="md:col-span-3">{/* <UserProfile /> */}</div>
          {/* Main Content Column */}
          <div className="md:col-span-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <nav className="flex justify-between mb-6">
                <button
                  onClick={() => setActiveComponent("form")}
                  className={`px-4 py-2 rounded-md ${
                    activeComponent === "form"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  } order-first`}
                >
                  Add Certificate
                </button>
                <button
                  onClick={() => setActiveComponent("verify")}
                  className={`px-4 py-2 rounded-md ${
                    activeComponent === "verify"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  } order-2`}
                >
                  Verify Certificate
                </button>
                <button
                  onClick={() => setActiveComponent("list")}
                  className={`px-4 py-2 rounded-md ${
                    activeComponent === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  } order-last`}
                >
                  List Certificates
                </button>
              </nav>
              {renderComponent()}
            </div>
          </div>

          {/* QR Code Reader Column */}
          <div className="md:col-span-3">{/* <QrCodeReader /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
