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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Define other routes here as your app grows */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
