// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Hospital from "./pages/Hospital";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NoticePanel from "./pages/NoticePanel";
import VaccineInfo from "./pages/VaccineInfo";
import ApplicableVaccine from "./pages/ApplicableVaccine";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/hospital" element={<Hospital setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/admin" element={<Admin setIsLoggedIn={setIsLoggedIn} />} />
  <Route path="/notices" element={<NoticePanel />} />
  <Route path="/vaccine-info" element={<VaccineInfo />} />
  <Route path="/applicable-vaccine" element={<ApplicableVaccine />} />
</Routes>
    </Router>
  );
}

export default App;
