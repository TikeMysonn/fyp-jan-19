import React, { useState, useRef } from "react";
import axios from "axios";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const CertVerify = () => {
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  // Styles for the placeholder and scanner
  const placeholderStyle = {
    width: "750px",
    height: "750px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    color: "#ccc",
    fontSize: "20px",
    textAlign: "center",
    padding: "20px",
  };

  const startScanner = async () => {
    setIsScanning(true);
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    try {
      const html5QrCode = new Html5Qrcode("reader");
      const cameras = await Html5Qrcode.getCameras();
      if (cameras.length > 0) {
        await html5QrCode.start(
          cameras[0].id,
          config,
          (decodedText) => {
            handleScanSuccess(decodedText, html5QrCode);
          },
          handleScanError
        );
        scannerRef.current = html5QrCode;
      } else {
        setError("No cameras found.");
        setIsScanning(false);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to start the scanner.");
      setIsScanning(false);
    }
  };

  const handleScanSuccess = async (decodedText, scanner) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/certs/verifyCertificate",
        {
          certId: decodedText,
          studentId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.status === "success") {
        alert(
          `Certificate is Genuine ✅:\n\nType: ${response.data.data.certificate.certType}\nCourse Name: ${response.data.data.certificate.courseName}\nGrade: ${response.data.data.certificate.grade}\nStudent Name: ${response.data.data.certificate.studentName}\nStudent ID: ${response.data.data.certificate.studentId}\nIssue Year: ${response.data.data.certificate.issueYear}\nUniversity Name: ${response.data.data.certificate.uniName}`
        );
        scanner.stop().finally(() => {
          setIsScanning(false);
          navigate("/certverify"); // Adjust the route as needed
        });
      }
    } catch (error) {
      alert(
        "Verification failed. Please make sure you are entering the correct Student ID."
      );
      scanner.stop().finally(() => {
        setIsScanning(false);
      });
    }
  };

  const handleScanError = (error) => {
    console.error(`Scan Error: ${error}`);
  };

  const handleVerifyClick = () => {
    if (!isScanning) {
      setError("");
      startScanner();
    }
  };

  return (
    <div className="container mx-auto p-6 ">
      <h2 className="text-center text-2xl font-bold mb-4">
        Verify Certificate
      </h2>
      <input
        type="text"
        placeholder="Step 1: Enter Student ID & Press Start"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-4 mb-4 w-full mx-auto"
      />
      {!isScanning && (
        <div style={placeholderStyle}>
          <p>Step 2: Click "Start Scanner" to activate camera</p>
        </div>
      )}
      <div
        id="reader"
        style={{
          display: isScanning ? "block" : "none",
          width: "250px",
          height: "250px",
          margin: "0 auto",
        }}
      ></div>
      <button
        onClick={handleVerifyClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {isScanning ? "Stop Scanner" : "Start Scanner"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CertVerify;
