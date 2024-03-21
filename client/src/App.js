// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import CertForm from "./components/CertForm";
import CertList from "./components/CertList";
import CertVerify from "./components/CertVerify";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Logout from "./components/Logout";

import "tailwindcss/tailwind.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/homepage" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/certform" element={<CertForm />} />
        <Route path="/certlist" element={<CertList />} />
        <Route path="/certverify" element={<CertVerify />} />
        <Route path="/homepage" element={<Homepage />} />
        {/* Add route for homepage */}
        <Route path="/header" element={<Header />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
