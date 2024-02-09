import React, { useState, useEffect } from "react";
import axios from "axios";

function CertList() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/certs/certificates",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCertificates(response.data.data.certificates);
      } catch (error) {
        console.error("Error fetching certificates", error);
      }
    };

    fetchCertificates();
  }, []);

  const handleDeleteConfirmation = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this certificate? This cannot be undone."
    );
    if (confirmation) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/certs/certificates/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCertificates(
        certificates.filter((certificate) => certificate._id !== id)
      );
      setSelectedCertificate(null); // Reset the selected certificate
      alert("Certificate deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting certificate:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Function to download QR code
  const downloadQrCode = (qrCodeUrl, studentId) => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `QRCode-${studentId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto custom-width-70">
      <div className="cert-list-container">
        <h2 className="text-xl font-semibold text-center mb-4">
          List of Certificates
        </h2>
        <ul className="list-disc">
          {certificates.map((certificate) => (
            <li key={certificate._id} className="mb-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setSelectedCertificate(certificate)}
              >
                {certificate.studentName} ({certificate.studentId}) -{" "}
                {certificate.grade}
              </button>
            </li>
          ))}
        </ul>

        {selectedCertificate && (
          <div className="certificate-details mt-4 p-4 rounded-lg shadow-md bg-white border-2 border-indigo-800 flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Certificate Details:</h3>
              <p>
                <strong>Type:</strong> {selectedCertificate.certType}
              </p>
              <p>
                <strong>Course Name:</strong> {selectedCertificate.courseName}
              </p>
              <p>
                <strong>Grade:</strong> {selectedCertificate.grade}
              </p>
              <p>
                <strong>Student Name:</strong> {selectedCertificate.studentName}
              </p>
              <p>
                <strong>Student ID:</strong> {selectedCertificate.studentId}
              </p>
              <p>
                <strong>Issued Year:</strong> {selectedCertificate.issueYear}
              </p>
              <p>
                <strong>University Name:</strong> {selectedCertificate.uniName}
              </p>
            </div>
            <div>
              {selectedCertificate.qrCode && (
                <>
                  <img
                    src={selectedCertificate.qrCode}
                    alt="QR Code"
                    className="mb-4"
                  />
                  <button
                    onClick={() =>
                      downloadQrCode(
                        selectedCertificate.qrCode,
                        selectedCertificate.studentId
                      )
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Download QR Code
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 flex justify-start space-x-2">
              <button
                className="text-sm py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors h-12"
                onClick={() =>
                  handleDeleteConfirmation(selectedCertificate._id)
                }
              >
                Delete Certificate
              </button>
              <button
                className="text-sm py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors h-12"
                onClick={() => setSelectedCertificate(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertList;
