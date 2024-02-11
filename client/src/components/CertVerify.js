import React, { useState } from "react";
import axios from "axios";
import { QrReader } from "react-qr-reader";

function CertVerify() {
  const [studentId, setStudentId] = useState("");
  const [qrData, setQrData] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (err) => {
    setError("Error reading the QR Code: " + err);
  };

  const handleVerify = async () => {
    if (qrData && studentId) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/certs/verifyCertificate",
          { certId: qrData, studentId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setScanResult(response.data);
      } catch (error) {
        setError("Verification failed. Please try again.");
      }
    } else {
      setError("Please scan a QR code and enter a student ID.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">
        Verify Certificate
      </h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div
        className="qr-reader-container mx-auto mb-4"
        style={{ width: "200px", height: "200px" }}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
          className="qr-reader"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleVerify}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4"
      >
        Verify Certificatee
      </button>

      {scanResult && (
        <div className="mt-4">
          <p className="text-green-500">{scanResult.message}</p>
          {/* Render additional certificate details here */}
        </div>
      )}
    </div>
  );
}

export default CertVerify;
