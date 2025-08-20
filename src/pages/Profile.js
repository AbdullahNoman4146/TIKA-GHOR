// pages/Profile.js
import React from "react";

function Profile() {
  return (
    <div style={layout}>
      {/* Sidebar */}
      <aside style={sidebar}>
        <h2 style={logo}>TIKA GHOR</h2>
        <nav>
          <ul style={navList}>
            <li style={navItemActive}>🏠 Dashboard</li>
            <li style={navItem}>👤 Profile</li>
            <li style={navItem}>📜 History</li>
            <li style={navItem}>⚙️ Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={main}>
        {/* Profile Header */}
        <div style={profileCard}>
          <img
            src="https://ui-avatars.com/api/?name=Sophia+Carter&background=1976d2&color=fff&size=120"
            alt="profile"
            style={profilePic}
          />
          <div>
            <h2 style={{ margin: "0 0 5px" }}>Sophia Carter</h2>
            <p style={subText}>Age: 30 | Female</p>
            <p style={subText}>sophia.carter@example.com</p>
            <button style={btnSecondary}>Edit Profile</button>
          </div>
        </div>

        {/* Book Appointment */}
        <div style={card}>
          <h3 style={sectionTitle}>📅 Book Appointment</h3>
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
        <div style={card}>
          <h3 style={sectionTitle}>💉 Vaccination History</h3>
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
        <div style={{ ...card, textAlign: "center" }}>
          <h3 style={sectionTitle}>📄 Download Vaccine Card</h3>
          <button style={btnPrimary}>Download</button>
        </div>
      </main>
    </div>
  );
}

/* ---- Styles ---- */
const layout = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f5f6fa",
  fontFamily: "Arial, sans-serif",
};

const sidebar = {
  width: "220px",
  background: "#0b1a3d", // Deep navy blue
  color: "#fff",
  padding: "25px 15px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const logo = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#87ceeb", // Sky/light blue
  letterSpacing: "1px",
};

const navList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const navItem = {
  padding: "10px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.2s",
};

const navItemActive = {
  ...navItem,
  background: "rgba(255,255,255,0.15)",
  fontWeight: "bold",
  color: "#87ceeb", // Sky blue active highlight
};

const main = {
  flex: 1,
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "14px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
};

const profileCard = {
  ...card,
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const profilePic = {
  borderRadius: "50%",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
};

const sectionTitle = {
  marginBottom: "15px",
  color: "#0b1a3d",
  borderBottom: "2px solid #eee",
  paddingBottom: "5px",
};

const subText = {
  margin: "3px 0",
  color: "#555",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px 20px",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  color: "#444",
};

const inputStyle = {
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginTop: "5px",
  fontSize: "14px",
};

const btnPrimary = {
  padding: "10px 22px",
  backgroundColor: "#0b1a3d",
  color: "#fff", // White text
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  transition: "0.3s",
};
btnPrimary[':hover'] = {
  backgroundColor: "#162a5f",
};

const btnSecondary = {
  ...btnPrimary,
  backgroundColor: "#e0e0e0",
  color: "#333", // Secondary button dark text
  marginTop: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
};

export default Profile;
