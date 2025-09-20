import React, { useState, useEffect } from "react";
import "./HomePage.css";
import logo from "./images/info.jpg";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestNotices();
  }, []);

  const fetchLatestNotices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notices');
      const data = await response.json();
      // Get the latest 3 notices
      const latestNotices = data.slice(0, 3);
      setNotices(latestNotices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notices:', error);
      setLoading(false);
    }
  };

  return (
    <div className="home">

      <header className="info">
        <div className="info-image">
          <img src={logo} alt="Info Image" />
        </div>
        <div className="info-text">
          <h1>
            Protect Your Health
            <br />
            with <span>TIKA GHOR</span>
          </h1>
          <p>
            Vaccines are a cornerstone of public health, safeguarding individuals and communities from preventable diseases. With TIKA GHOR, managing your vaccination schedule is simple and efficient, ensuring you stay protected.
          </p>
        </div>
      </header>

      <section className="booking">
        <h2>How to Book Your Vaccination</h2>
        <div className="steps">
          <div className="step-card">
            <h3>Register</h3>
            <p>Create your account on the TIKA GHOR portal.</p>
          </div>
          <div className="step-card">
            <h3>Book Appointment</h3>
            <p>Choose your preferred date, time, and vaccination center.</p>
          </div>
          <div className="step-card">
            <h3>Get Vaccinated</h3>
            <p>Visit the center and receive your vaccine.</p>
          </div>
        </div>
      </section>

      <section className="notices">
        <h2>Recent Notices</h2>
        <div className="notice-grid">
          {loading ? (
            <div className="notice-loading">Loading notices...</div>
          ) : notices.length === 0 ? (
            <div className="no-notices-available">
              <p>No notices available at the moment.</p>
            </div>
          ) : (
            notices.map((notice, index) => (
              <div key={notice._id || index} className="notice">
                <h4>
                  {index === 0 ? "🚨 Latest Update" :
                    index === 1 ? "📋 Important" : "ℹ️ Information"}
                </h4>
                <b>{notice.title}</b>
                <p>
                  {notice.content.length > 100
                    ? `${notice.content.substring(0, 100)}...`
                    : notice.content
                  }
                </p>
                <div className="notice-footer">
                  <span>By: {notice.author}</span>
                  <button
                    onClick={() => navigate("/notices")}
                    className="read-more-btn"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="view-all-container">
          <button
            onClick={() => navigate("/notices")}
            className="view-all-btn"
          >
            View All Notices
          </button>
        </div>
      </section>

      <footer className="footer">
        <p> Contact Us: 106 &nbsp; | &nbsp; Emergency: 999 &nbsp; | &nbsp; Health Information: 16263 </p>
        <p>© 2024 Ministry of Health and Family Welfare. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;