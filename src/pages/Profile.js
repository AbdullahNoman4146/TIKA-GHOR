import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile({ setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [vaccines, setVaccines] = useState([]);
  const [appointments, setAppointments] = useState([]);


  // Fetch hospitals
  useEffect(() => {
    axios.get("http://localhost:5000/api/hospitals/public")
      .then(res => setHospitals(res.data))
      .catch(err => console.error("Error fetching hospitals:", err));
  }, []);

  // Fetch user appointments
  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setAppointments(res.data))
      .catch(err => console.error("Error fetching appointments:", err));
  }, []);

  // Update vaccines when hospital selected
  useEffect(() => {
    const hospital = hospitals.find(h => h._id === selectedHospital);
    if (hospital) setVaccines(hospital.availableVaccines || []);
    else setVaccines([]);
  }, [selectedHospital, hospitals]);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const time = e.target.time.value;
    const vaccine = e.target.vaccine.value;

    axios.post("http://localhost:5000/api/appointments", {
      hospitalId: selectedHospital,
      vaccine,
      date,
      time
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        alert("Appointment booked!");
        setAppointments([res.data, ...appointments]);
      })
      .catch(err => {
        console.error("Error booking:", err);
        alert("Failed to book appointment");
      });
  };


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
        // If unauthorized or user not found, log out and reset state
        if (
          err.response &&
          (err.response.status === 401 ||
            err.response.status === 403 ||
            err.response.status === 404)
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userRole");
          localStorage.removeItem("user");
          localStorage.removeItem("userName");
          if (typeof setIsLoggedIn === "function") setIsLoggedIn(false);
          navigate("/login");
        } else {
          setLoading(false);
        }
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
          <form onSubmit={handleSubmit}>
            <div className="formGrid">
              <div className="formGroup">
                <label>Select Hospital</label>
                <select
                  className="inputStyle"
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  required
                >
                  <option value="">Choose hospital</option>
                  {hospitals.map((h) => (
                    <option key={h._id} value={h._id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label>Select Vaccine</label>
                <select className="inputStyle" name="vaccine" required disabled={!vaccines.length}>
                  <option value="">Choose a vaccine</option>
                  {vaccines.map((v, idx) => (
                    <option key={idx} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label>Select Date</label>
                <input type="date" name="date" className="inputStyle" required />
              </div>

              <div className="formGroup">
                <label>Select Time</label>
                <input type="time" name="time" className="inputStyle" required />
              </div>
            </div>
            <div className="submitRow">
              <button className="btnPrimary" type="submit">
                Submit
              </button>
            </div>
          </form>
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
              {appointments.length > 0 ? (
                appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.vaccine}</td>
                    <td>{a.hospital?.name}</td>
                    <td>{new Date(a.date).toLocaleDateString()}</td>
                    <td>{a.dose}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No appointments found</td>
                </tr>
              )}
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
