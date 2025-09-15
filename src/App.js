import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Hospital from "./pages/Hospital";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NoticePanel from "./pages/NoticePanel"; // Import NoticePanel
import VaccineInfo from "./pages/VaccineInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/notices" element={<NoticePanel />} /> 
       <Route path="/vaccine-info" element={<VaccineInfo />} /> 
      </Routes>
    </Router>
  );
}

export default App;