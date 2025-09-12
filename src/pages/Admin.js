import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
    const [hospitals, setHospitals] = useState([]);
    const [users, setUsers] = useState([]);
    const [notices, setNotices] = useState([]);
    const [newHospital, setNewHospital] = useState({ email: "", password: "" });
    const [newNotice, setNewNotice] = useState("");

    const navigate = useNavigate();

    // Fetch hospitals
    const fetchHospitals = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/hospitals");
            const data = await res.json();
            setHospitals(data);
        } catch (err) {
            console.error("❌ Error fetching hospitals:", err);
        }
    };

    // Fetch users
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/user");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("❌ Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchHospitals();
        fetchUsers();
    }, []);

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    // Add new hospital
    const handleAddHospital = async () => {
        if (!newHospital.email || !newHospital.password) {
            alert("Please fill hospital details");
            return;
        }

        const res = await fetch("http://localhost:5000/api/hospitals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newHospital),
        });

        if (res.ok) {
            alert("Hospital added successfully!");
            setNewHospital({ email: "", password: "" });

            //Refresh list from DB
            await fetchHospitals();
        } else {
            const error = await res.json();
            alert("Error adding hospital: " + error.message);
        }
    };

    // Add new notice
    const handleAddNotice = () => {
        if (!newNotice.trim()) return;
        setNotices([...notices, newNotice]);
        setNewNotice("");
    };

    // Remove hospital
    const handleRemoveHospital = async (email) => {
        if (!window.confirm("Are you sure?")) return;

        const res = await fetch(`http://localhost:5000/api/hospitals/${email}`, {
            method: "DELETE",
        });

        if (res.ok) {
            await fetchHospitals(); //Refresh after delete
        } else {
            alert("Error removing hospital");
        }
    };

    // Remove user
    const handleRemoveUser = async (email) => {
        if (!window.confirm("Are you sure?")) return;

        const res = await fetch(`http://localhost:5000/api/user/${email}`, {
            method: "DELETE",
        });

        if (res.ok) {
            await fetchUsers(); //Refresh after delete
        } else {
            alert("Error removing user");
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </header>

            {/* Hospital Section */}
            <div className="card">
                <h2>Add Hospital</h2>
                <input
                    type="email"
                    placeholder="Hospital Email"
                    value={newHospital.email}
                    onChange={(e) =>
                        setNewHospital({ ...newHospital, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Hospital Password"
                    value={newHospital.password}
                    onChange={(e) =>
                        setNewHospital({ ...newHospital, password: e.target.value })
                    }
                />
                <button onClick={handleAddHospital}>Add Hospital</button>

                <h3>Hospitals List</h3>
                <ul>
                    {hospitals.map((h, idx) => (
                        <li key={idx}>
                            {h.email}
                            <button onClick={() => handleRemoveHospital(h.email)}>❌</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Notices Section */}
            <div className="card">
                <h2>Post Notices</h2>
                <textarea
                    placeholder="Write notice here..."
                    value={newNotice}
                    onChange={(e) => setNewNotice(e.target.value)}
                />
                <button onClick={handleAddNotice}>Add Notice</button>

                <h3>Notices</h3>
                <ul>
                    {notices.map((n, idx) => (
                        <li key={idx}>{n}</li>
                    ))}
                </ul>
            </div>

            {/* Users Section */}
            <div className="card">
                <h2>Manage Users</h2>
                <ul>
                    {users.map((u, idx) => (
                        <li key={idx}>
                            {u.name} ({u.email})
                            <button onClick={() => handleRemoveUser(u.email)}>❌</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Admin;
