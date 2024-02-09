import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import CertForm from "./components/CertForm";
import CertList from "./components/CertList";
import CertVerify from "./components/CertVerify";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/certform" element={<CertForm />} />
        <Route path="/certlist" element={<CertList />} />
        <Route path="/certverify" element={<CertVerify />} />
        {/* Define other routes here as your app grows */}
      </Routes>
    </Router>
  );
};

export default App;
