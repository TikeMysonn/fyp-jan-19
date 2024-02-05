//before routing
// import React from "react";
// import LoginForm from "./components/LoginForm";

// const App = () => {
//   return (
//     <div className="App">
//       <LoginForm />
//     </div>
//   );
// };

// export default App;

//after implementing routing
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import CertForm from "./components/CertForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/certform" element={<CertForm />} />
        {/* Define other routes here as your app grows */}
      </Routes>
    </Router>
  );
};

export default App;
