import React, { useState, useEffect } from 'react';
import './NoticePanel.css';
import { useNavigate } from 'react-router-dom';

function NoticePanel() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notices');
      const data = await response.json();
      setNotices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notices:', error);
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="notice-panel-container">
        <div className="notice-panel-loading">
          <h2>Loading Notices...</h2>
          <p>Please wait while we fetch the latest updates</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notice-panel-container">
      <header className="notice-panel-header">
        <h1>📢 Notice Panel</h1>
        <button className="back-btn" onClick={handleBackToHome}>
          ← Back to Home
        </button>
      </header>
      
      <h2 className="notice-panel-title">Latest Vaccine Updates & Announcements</h2>
      
      <div className="notices-list">
        {notices.length === 0 ? (
          <div className="no-notices">
            <h3>No Notices Available</h3>
            <p>Check back later for important vaccine updates and announcements</p>
          </div>
        ) : (
          notices.map(notice => (
            <div key={notice._id} className="notice-card">
              <h3>📌 {notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
              <div className="notice-meta-fixed">
                <span className="notice-author">Posted by: <strong>{notice.author}</strong></span>
                <span className="notice-date-right">
                  {new Date(notice.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NoticePanel;