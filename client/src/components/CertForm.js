import React, { useState } from "react";
import axios from "axios";

function CertForm() {
  const [certData, setCertData] = useState({
    certType: "",
    courseName: "",
    grade: "",
    studentName: "",
    studentId: "",
    issueYear: "",
    uniName: "",
  });
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState(""); // State to hold the QR code data URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/certs/certificates",
        certData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Certificate registered successfully!");
      console.log(response.data);
      setQrCode(response.data.data.qrCode); // Set the QR code data URL
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to register certificate."
      );
    }
  };

  // Function to download QR code
  const downloadQrCode = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `QRCode-${certData.studentId}.png`; // Name the download file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Certificate
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in the certificate details
          </p>
          {message && (
            <div
              className={`mt-2 text-center p-2 ${
                message.includes("successfully")
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* qr code here */}
          {qrCode && (
            <div className="text-center">
              <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
              <button
                onClick={downloadQrCode}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="py-2">
              <input
                type="text"
                name="certType"
                placeholder="Certificate Type"
                value={certData.certType}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="py-2">
              <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                value={certData.courseName}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="py-2">
              <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={certData.grade}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="py-2">
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={certData.studentName}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="py-2">
              <input
                type="text"
                name="studentId"
                placeholder="Student ID"
                value={certData.studentId}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="py-2">
              <input
                type="text"
                name="issueYear"
                placeholder="Issue Year"
                value={certData.issueYear}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="py-2">
              <input
                type="text"
                name="uniName"
                placeholder="University Name"
                value={certData.uniName}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default CertForm;
