import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password || !role) {
      alert("⚠️ Please fill in all fields and select a role");
      return;
    }

    try {
      // 🔹 Call backend to check credentials
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      if (res.data) {
        // ✅ Save user email in localStorage
        localStorage.setItem("userEmail", res.data.email);

        // 🔹 Navigate based on role
        if (role === "Hospital") {
          navigate("/hospital");
        } else if (role === "Patient") {
          navigate("/profile");
        } else if (role === "Admin") {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Invalid email or password");
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
