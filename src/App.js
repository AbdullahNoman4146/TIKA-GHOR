import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Hospital from "./pages/Hospital";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";   //Import Admin Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />   {/*Patient Page */}
        <Route path="/admin" element={<Admin />} />       {/*Admin Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
