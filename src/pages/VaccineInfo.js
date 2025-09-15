import React from "react";
import "./VaccineInfo.css";
import { useNavigate } from "react-router-dom";

function VaccineInfo() {
  const navigate = useNavigate();

  const vaccines = [
    {
      name: "COVID-19 Vaccine",
      age: "12 years and above",
      doses: "2 primary doses + 1 booster",
      schedule: "Second dose after 4-6 weeks, booster after 6 months",
      importance: "Prevents severe illness, hospitalization and death from COVID-19",
      sideEffects: "Mild fever, headache, fatigue, muscle pain, injection site pain"
    },
    {
      name: "MMR Vaccine",
      age: "12-15 months (1st dose), 4-6 years (2nd dose)",
      doses: "2 doses",
      schedule: "Second dose at least 28 days after first dose",
      importance: "Protects against Measles, Mumps, and Rubella",
      sideEffects: "Mild rash, fever, swollen cheeks, temporary joint pain"
    },
    {
      name: "Hepatitis B Vaccine",
      age: "Birth and above",
      doses: "3 doses",
      schedule: "0, 1-2 months, 6-18 months",
      importance: "Prevents liver infection that can lead to cirrhosis or liver cancer",
      sideEffects: "Soreness at injection site, mild fever"
    },
    {
      name: "Polio Vaccine",
      age: "2 months, 4 months, 6-18 months, 4-6 years",
      doses: "4 doses",
      schedule: "As per national immunization schedule",
      importance: "Eradicates polio and prevents paralysis",
      sideEffects: "Redness or swelling at injection site"
    },
    {
      name: "BCG Vaccine",
      age: "At birth",
      doses: "1 dose",
      schedule: "Soon after birth",
      importance: "Protects against severe forms of tuberculosis",
      sideEffects: "Small sore at injection site, swollen lymph nodes"
    },
    {
      name: "Tetanus Vaccine",
      age: "2, 4, 6 months, 15-18 months, 4-6 years",
      doses: "5 doses + boosters every 10 years",
      schedule: "As per national immunization schedule",
      importance: "Prevents lockjaw and muscle stiffness",
      sideEffects: "Pain, redness, swelling at injection site, mild fever"
    }
  ];

  return (
    <div className="vaccine-info-container">
      <header className="vaccine-header">
        <h1>💉 Vaccine Information Center</h1>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </header>

      <div className="vaccine-intro">
        <h2>Comprehensive Vaccine Guide</h2>
        <p>Get detailed information about vaccines, their schedules, importance, and possible side effects. Stay informed and protect your family.</p>
      </div>

      <div className="vaccine-grid">
        {vaccines.map((vaccine, index) => (
          <div key={index} className="vaccine-card">
            <h3>{vaccine.name}</h3>
            <div className="vaccine-details">
              <div className="detail-item">
                <span className="detail-label">🔄 Recommended Age:</span>
                <span className="detail-value">{vaccine.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📋 Number of Doses:</span>
                <span className="detail-value">{vaccine.doses}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📅 Schedule:</span>
                <span className="detail-value">{vaccine.schedule}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🛡️ Importance:</span>
                <span className="detail-value">{vaccine.importance}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">⚠️ Side Effects:</span>
                <span className="detail-value">{vaccine.sideEffects}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="additional-info">
        <h3>📋 General Vaccination Guidelines</h3>
        <div className="guidelines">
          <div className="guideline-item">
            <h4>Before Vaccination</h4>
            <ul>
              <li>Inform your doctor about any allergies or medical conditions</li>
              <li>Don't take vaccination on empty stomach</li>
              <li>Wear loose clothing for easy access to upper arm</li>
            </ul>
          </div>
          <div className="guideline-item">
            <h4>After Vaccination</h4>
            <ul>
              <li>Stay at the center for 30 minutes for observation</li>
              <li>Apply cold compress if there's swelling or pain</li>
              <li>Drink plenty of fluids</li>
              <li>Monitor for any adverse reactions for 24-48 hours</li>
            </ul>
          </div>
          <div className="guideline-item">
            <h4>When to Consult Doctor</h4>
            <ul>
              <li>High fever (above 102°F)</li>
              <li>Severe allergic reactions</li>
              <li>Difficulty breathing</li>
              <li>Seizures or convulsions</li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="vaccine-footer">
        <p>For emergency: Contact 106 or visit nearest healthcare facility</p>
        <p>© 2024 Ministry of Health and Family Welfare. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default VaccineInfo;