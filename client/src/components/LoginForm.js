import React, { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store the token
        localStorage.setItem("user", JSON.stringify(data.data)); // Store user data, assuming data.data includes {username, role}
        alert(
          `Welcome ${
            data.data.username
          }, you are logged in as ${data.data.role.toUpperCase()}`
        );
        window.location.href = "/dashboard"; // Redirect to Dashboard
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //for background image
  {
    /* <div
className="min-h-screen flex items-center justify-center px-6"
style={{
  backgroundImage:
    'url("https://e0.pxfuel.com/wallpapers/1017/65/desktop-wallpaper-accomplishment-ceremony-college-education-friends-graduation-group-hats-people-school-student-students-success-together-university-college-student.jpg")',
  backgroundPosition: "center",
  backgroundSize: "70%", // Adjust this value as needed
  backgroundRepeat: "no-repeat",
}}
> */
  }

  //https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundPosition: "center",
        backgroundSize: "70%", // Adjust this value as needed
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
