import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const email = localStorage.getItem("userEmail");
  if (!email) {
    setLoading(false);
    return;
  }

  axios
    .get(`http://localhost:5000/api/user/${email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => {
      setUser(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("❌ Error fetching user:", err);
      setLoading(false);
    });
}, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
  localStorage.removeItem("user");
  localStorage.removeItem("userName");
  if (typeof setIsLoggedIn === "function") setIsLoggedIn(false);
  navigate("/login");
}
  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!user) return <h2 className="loading">No user found</h2>;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TIKA GHOR</h2>

        {/*Logout button in sidebar */}
        <button className="btnLogout" onClick={handleLogout}>
          🚪 Logout
        </button>

        <nav>
          <ul className="navList">
            <li className="navItemActive">🏠 Dashboard</li>
            <li className="navItem">👤 Profile</li>
            <li className="navItem">📜 History</li>
            <li className="navItem">⚙️ Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Profile Header */}
        <div className="profileCard">
          <img
            src={
              user.photo ||
              `https://ui-avatars.com/api/?name=${user.name}&background=1976d2&color=fff&size=120`
            }
            alt="profile"
            className="profilePic"
          />
          <div>
            <h2>{user.name}</h2>
            <p className="subText">
              DOB: {new Date(user.dob).toLocaleDateString()} | {user.sex}
            </p>
            <p className="subText">{user.email}</p>
            <button className="btnSecondary">Edit Profile</button>
          </div>
        </div>

        {/* Book Appointment */}
        <div className="card">
          <h3 className="sectionTitle">📅 Book Appointment</h3>
          <div className="formGrid">
            <div className="formGroup">
              <label>Select Vaccine</label>
              <select className="inputStyle">
                <option>Choose a vaccine</option>
                <option>Vaccine A</option>
                <option>Vaccine B</option>
              </select>
            </div>
            <div className="formGroup">
              <label>Select Hospital</label>
              <select className="inputStyle">
                <option>Choose hospital</option>
                <option>City Hospital</option>
                <option>Central Clinic</option>
              </select>
            </div>
            <div className="formGroup">
              <label>Select Date</label>
              <input type="date" className="inputStyle" />
            </div>
            <div className="formGroup">
              <label>Select Time</label>
              <input type="time" className="inputStyle" />
            </div>
          </div>
          <div className="submitRow">
            <button className="btnPrimary">Submit</button>
          </div>
        </div>

        {/* Vaccination History */}
        <div className="card">
          <h3 className="sectionTitle">💉 Vaccination History</h3>
          <table className="tableStyle">
            <thead>
              <tr>
                <th>Vaccine</th>
                <th>Hospital</th>
                <th>Date</th>
                <th>Dose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vaccine A</td>
                <td>City Hospital</td>
                <td>2023-05-15</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Vaccine B</td>
                <td>Central Clinic</td>
                <td>2023-08-20</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download Card */}
        <div className="card centerCard">
          <h3 className="sectionTitle">📄 Download Vaccine Card</h3>
          <button className="btnPrimary">Download</button>
        </div>
      </main>
    </div>
  );
}

export default Profile;
