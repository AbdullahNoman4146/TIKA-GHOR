// pages/Profile.js
import React from "react";

function Profile() {
  return (
    <div style={container}>
      {/* Profile Info */}
      <div style={{ ...cardStyle, textAlign: "center" }}>
        <img
          src="https://ui-avatars.com/api/?name=Sophia+Carter&background=1976d2&color=fff&size=100"
          alt="profile"
          style={{ borderRadius: "50%", marginBottom: "15px" }}
        />
        <h2 style={{ margin: "5px 0" }}>Sophia Carter</h2>
        <p style={{ margin: "3px 0", color: "#555" }}>Age: 30 | Female</p>
        <p style={{ margin: "3px 0", color: "#555" }}>sophia.carter@example.com</p>
        <button style={btnPrimary}>Edit Profile</button>
      </div>

      {/* Book Appointment */}
      <div style={cardStyle}>
        <h3 style={sectionTitle}>Book Appointment</h3>
        <div style={formGrid}>
          <div style={formGroup}>
            <label>Select Vaccine</label>
            <select style={inputStyle}>
              <option>Choose a vaccine</option>
              <option>Vaccine A</option>
              <option>Vaccine B</option>
            </select>
          </div>
          <div style={formGroup}>
            <label>Select Hospital</label>
            <select style={inputStyle}>
              <option>Choose hospital</option>
              <option>City Hospital</option>
              <option>Central Clinic</option>
            </select>
          </div>
          <div style={formGroup}>
            <label>Select Date</label>
            <input type="date" style={inputStyle} />
          </div>
          <div style={formGroup}>
            <label>Select Time</label>
            <input type="time" style={inputStyle} />
          </div>
        </div>
        <div style={{ textAlign: "right", marginTop: "15px" }}>
          <button style={btnPrimary}>Submit</button>
        </div>
      </div>

      {/* Vaccination History */}
      <div style={cardStyle}>
        <h3 style={sectionTitle}>Vaccination History</h3>
        <table style={tableStyle}>
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
      <div style={{ ...cardStyle, textAlign: "center" }}>
        <h3 style={sectionTitle}>Download Vaccine Card</h3>
        <button style={btnPrimary}>Download</button>
      </div>
    </div>
  );
}

/* ---- Styles ---- */
const container = {
  maxWidth: "1000px",
  margin: "30px auto",
  padding: "0 20px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};

const cardStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const sectionTitle = {
  marginBottom: "15px",
  color: "#333",
  borderBottom: "2px solid #eee",
  paddingBottom: "5px",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px 20px",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginTop: "5px",
};

const btnPrimary = {
  padding: "10px 20px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
};

export default Profile;
