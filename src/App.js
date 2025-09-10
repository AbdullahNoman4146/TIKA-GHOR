import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Hospital from "./pages/Hospital";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />   {/* ✅ Patient Page */}
      </Routes>
    </Router>
  );
}

export default App;
