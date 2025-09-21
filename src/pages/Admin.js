import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [hospitals, setHospitals] = useState([]);
  const [users, setUsers] = useState([]);
  const [notices, setNotices] = useState([]);
  const [newHospital, setNewHospital] = useState({ email: "", password: "" });
  const [newNotice, setNewNotice] = useState({ title: "", content: "", author: "" });
  const navigate = useNavigate();

  // Fetch hospitals
  const fetchHospitals = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/hospitals", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await res.json();
    setHospitals(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("❌ Error fetching hospitals:", err);
    setHospitals([]); // fallback to empty array
  }
};

  const fetchUsers = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/user", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    setUsers([]);
  }
};

const fetchNotices = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/notices");
    const data = await res.json();
    setNotices(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("❌ Error fetching notices:", err);
    setNotices([]);
  }
};

  useEffect(() => {
    fetchHospitals();
    fetchUsers();
    fetchNotices();
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
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
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
  const handleAddNotice = async () => {
    if (!newNotice.title.trim() || !newNotice.content.trim()) {
      alert("Please fill notice title and content");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:5000/api/notices", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
  body: JSON.stringify(newNotice),
});
      
      if (res.ok) {
        alert("Notice created successfully!");
        setNewNotice({ title: "", content: "", author: "" });
        await fetchNotices(); // Refresh notices list
      } else {
        alert("Error creating notice");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating notice");
    }
  };

  // Remove hospital
  const handleRemoveHospital = async (email) => {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:5000/api/hospitals/${email}`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
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
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
});
    if (res.ok) {
      await fetchUsers(); //Refresh after delete
    } else {
      alert("Error removing user");
    }
  };

  // Remove notice
  const handleRemoveNotice = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/notices/${id}`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
});
      
      if (res.ok) {
        await fetchNotices(); // Refresh notices list
      } else {
        alert("Error removing notice");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error removing notice");
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
          onChange={(e) => setNewHospital({ ...newHospital, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Hospital Password"
          value={newHospital.password}
          onChange={(e) => setNewHospital({ ...newHospital, password: e.target.value })}
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
        <input 
          type="text" 
          placeholder="Notice Title" 
          value={newNotice.title}
          onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
        />
        <textarea
          placeholder="Write notice content here..."
          value={newNotice.content}
          onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
          rows="5"
        />
        <input 
          type="text" 
          placeholder="Author" 
          value={newNotice.author}
          onChange={(e) => setNewNotice({ ...newNotice, author: e.target.value })}
        />
        <button onClick={handleAddNotice}>Add Notice</button>
        <h3>Notices (From Database)</h3>
        <ul>
          {notices.map((notice) => (
            <li key={notice._id}>
              <strong>{notice.title}</strong>: {notice.content}
              <button onClick={() => handleRemoveNotice(notice._id)}>❌</button>
            </li>
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