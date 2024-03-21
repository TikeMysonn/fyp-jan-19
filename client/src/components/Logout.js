import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
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
        localStorage.removeItem("token"); // Assuming you store the token in local storage
        // Redirect to the login page or any other desired page
        alert("Logout successful");
        navigate("/home");
      } else {
        // Handle error response from the server
        const text = await response.text(); // Read response body as text
        if (text) {
          const data = JSON.parse(text); // Parse JSON data if available
          alert(data.message); // Show error message to the user
        } else {
          throw new Error("Empty response from server");
        }
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle any other errors
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: "100px" }}>
      Logout
    </button>
  );
};

export default Logout;
