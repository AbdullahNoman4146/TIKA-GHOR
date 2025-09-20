import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    try {
      // Call backend for login
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      if (res.data) {
        const { email, role, name } = res.data;

        // Save user details in localStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);
        if (name) localStorage.setItem("userName", name);

        // 🔹 Update global login state
        setIsLoggedIn(true);

        // 🔹 Navigate based on backend role
        switch (role) {
          case "Admin":
            navigate("/admin");
            break;
          case "Hospital":
            navigate("/hospital");
            break;
          case "Patient":
            navigate("/profile");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Invalid email or password");
      }
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
        </form>

        <button
          type="button"
          className="btn-signup"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>

        <div className="Back-Home">
          <a href="/">Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
