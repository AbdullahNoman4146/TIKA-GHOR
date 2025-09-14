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
    return <div className="notice-panel-loading">Loading notices...</div>;
  }

  return (
    <div className="notice-panel-container">
      <header className="notice-panel-header">
        <h1>Notice Board</h1>
        <button className="back-btn" onClick={handleBackToHome}>
          Back to Home
        </button>
      </header>
      
      <div className="notices-list">
        {notices.length === 0 ? (
          <p className="no-notices">No notices available.</p>
        ) : (
          notices.map(notice => (
            <div key={notice._id} className="notice-card">
              <h3>{notice.title}</h3>
              <p className="notice-content">{notice.content}</p>
              <div className="notice-meta">
                <span>By: {notice.author}</span>
                <span>Date: {new Date(notice.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NoticePanel;