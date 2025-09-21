import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Hospital.css";

function Hospital({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("userEmail") || "";
  const [loading, setLoading] = useState(true);
  const [hospital, setHospital] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    email: storedEmail,
    name: "",
    address: "",
    contact: "",
    vaccinesText: "",
    openingHours: "",
    photo: "",
  });

  const handleAuthError = (err) => {
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
  }
};

useEffect(() => {
  const fetchHospital = async () => {
    if (!storedEmail) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/hospitals/${storedEmail}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const data = res.data;

      if (!data) {
        setIsEditing(true);
        setForm((f) => ({ ...f, email: storedEmail }));
      } else {
        setHospital(data);
        setForm({
          email: data.email || storedEmail,
          name: data.name || "",
          address: data.address || "",
          contact: data.contact || "",
          vaccinesText: (data.availableVaccines || []).join(", "),
          openingHours: data.openingHours || "",
          photo: data.photo || "",
        });
        setIsEditing(false);
      }
    } catch (err) {
      handleAuthError(err);
      setIsEditing(true);
      setForm((f) => ({ ...f, email: storedEmail }));
    } finally {
      setLoading(false);
    }
  };

  fetchHospital();
}, [storedEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.email || !form.name) {
      alert("Please enter at least email and hospital name.");
      return;
    }

    try {
      const payload = {
        email: form.email,
        name: form.name,
        address: form.address,
        contact: form.contact,
        availableVaccines: form.vaccinesText
          ? form.vaccinesText.split(",").map((v) => v.trim()).filter(Boolean)
          : [],
        openingHours: form.openingHours,
        photo: form.photo,
      };

      const res = await axios.post(
        "http://localhost:5000/api/hospitals",
        payload
      );

      setHospital(res.data);
      setIsEditing(false);
      alert("Hospital information saved successfully.");
    } catch (err) {
      console.error("Error saving hospital:", err);
      alert("Failed to save hospital information.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (hospital) {
      setForm({
        email: hospital.email || storedEmail,
        name: hospital.name || "",
        address: hospital.address || "",
        contact: hospital.contact || "",
        vaccinesText: (hospital.availableVaccines || []).join(", "),
        openingHours: hospital.openingHours || "",
        photo: hospital.photo || "",
      });
      setIsEditing(false);
    } else {
      setForm({
        email: storedEmail,
        name: "",
        address: "",
        contact: "",
        vaccinesText: "",
        openingHours: "",
        photo: "",
      });
      setIsEditing(true);
    }
  };

  // 🔹 Logout function
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
  localStorage.removeItem("user");
  localStorage.removeItem("userName");
  if (typeof setIsLoggedIn === "function") setIsLoggedIn(false);
  navigate("/login");
}

  if (loading) {
    return (
      <div className="hospital-container">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  if (!storedEmail) {
    return (
      <div className="hospital-container">
        <div className="hospital-card">
          <h3>Please login first</h3>
          <p>No hospital email found. Log in with the hospital account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hospital-container">
      <div className="hospital-header-top">
        <h2 className="hospital-dashboard-title">🏥 Hospital Dashboard</h2>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Hospital Profile View */}
      {!isEditing && hospital && (
        <div className="hospital-card">
          <div className="hospital-header">
            <img
              className="hospital-avatar"
              src={
                hospital.photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  hospital.name || hospital.email
                )}&background=1976d2&color=fff&size=120`
              }
              alt="hospital"
            />
            <div className="hospital-meta">
              <h2 className="hospital-name">
                {hospital.name || "Unnamed Hospital"}
              </h2>
              <p className="hospital-email">{hospital.email}</p>
              <p className="hospital-address">{hospital.address}</p>
            </div>
            <div className="hospital-actions">
              <button className="btn-edit" onClick={handleEdit}>
                Edit
              </button>
            </div>
          </div>

          <div className="hospital-info">
            <div>
              <strong>Contact:</strong> {hospital.contact || "—"}
            </div>
            <div>
              <strong>Opening Hours:</strong> {hospital.openingHours || "—"}
            </div>
            <div className="vaccine-list">
              <strong>Available Vaccines:</strong>
              <div className="badges">
                {(hospital.availableVaccines || []).length === 0 ? (
                  <span className="empty">No vaccines listed</span>
                ) : (
                  (hospital.availableVaccines || []).map((v, i) => (
                    <span key={i} className="badge">
                      {v}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && (
        <div className="hospital-card">
          <h2>{hospital ? "Edit Hospital Profile" : "Set Up Hospital Profile"}</h2>
          <div className="hospital-form">
            <label>Hospital Email (readonly)</label>
            <input name="email" value={form.email} readOnly />

            <label>Hospital Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. City Hospital"
            />

            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, City, District"
            />

            <label>Contact Number</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="+8801xxxxxxxxx"
            />

            <label>Available Vaccines (comma separated)</label>
            <input
              name="vaccinesText"
              value={form.vaccinesText}
              onChange={handleChange}
              placeholder="Vaccine A, Vaccine B"
            />

            <label>Opening Hours</label>
            <input
              name="openingHours"
              value={form.openingHours}
              onChange={handleChange}
              placeholder="09:00 - 17:00"
            />

            <label>Photo URL (optional)</label>
            <input
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://..."
            />

            <div className="form-actions">
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hospital;
