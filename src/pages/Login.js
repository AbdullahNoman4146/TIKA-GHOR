import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // track selected role

  const handleLogin = () => {
    if (role === "Hospital") {
      navigate("/hospital");
    } else if (role === "Patient") {
      navigate("/profile");
    } else if (role === "Admin") {
      navigate("/admin");
    } else {
      alert("⚠️ Please select a role before logging in");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          className="login-banner"
          src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg"
          alt="Doctors"
        />
        <h2>WELCOME TO TIKA GHOR</h2>
        <p>Please login to continue</p>

        <form>
          <div className="form-group">
            <label>Email or Username</label>
            <input type="text" placeholder="Enter your email or username" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="button" className="btn-login" onClick={handleLogin}>
            Log In
          </button>

          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="Hospital">Hospital</option>
              <option value="Patient">Patient</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </form>

        <button
          type="button"
          className="btn-signup"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>

        <div className="Back-Home">
          <a href="#">Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
