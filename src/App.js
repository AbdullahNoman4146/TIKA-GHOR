import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<div>Login Page Placeholder</div>} />
      </Routes>
    </Router>

  );
}

export default App;
