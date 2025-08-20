import React from "react";
import "./HomePage.css";
import logo from "../logo.svg";

function HomePage() {
  return (
    <div className="home">
      
      <nav className="navbar">
        <div className="nav-left">TIKA GHOR</div>
        <div className="nav-right">
          <button onClick={() => { /* place */ }}>Login</button>
          <button onClick={() => { /* place */ }}>Notice Panel</button>
          <button onClick={() => { /* place */ }}>Vaccine Information</button>
          <button onClick={() => { /* place */ }}>Applicable Vaccine</button>
          <button onClick={() => { /* place */ }}>Vaccine Card Download</button>
        </div>
      </nav>

      
      <header className="info">
        <div className="info-image">
          <img src={logo} alt="Info Image" />
        </div>
        <div className="info-text">
          <h1>
            Protect Your Health <br /> with <span>TIKA GHOR</span>
          </h1>
          <p>
            Vaccines are a cornerstone of public health, safeguarding individuals
            and communities from preventable diseases. With TIKA GHOR, managing
            your vaccination schedule is simple and efficient, ensuring you stay
            protected.
          </p>
          <button className="learn-btn">Learn More</button>
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
          <div className="notice">
            <h4>Important Update</h4>
            <b>New Vaccination Center Opens in Dhaka</b>
            <p>
              A new vaccination center is now open in Dhaka, offering more
              appointment slots. Book your appointment today!
            </p>
          </div>

          <div className="notice">
            <h4>Reminder</h4>
            <b>Flu Vaccine Available</b>
            <p>
              The seasonal flu vaccine is now available. Protect yourself and
              your loved ones by getting vaccinated.
            </p>
          </div>

          <div className="notice">
            <h4>Information</h4>
            <b>COVID-19 Booster Shots</b>
            <p>
              Booster shots are recommended for enhanced protection against
              COVID-19. Check your eligibility and book your appointment.
            </p>
          </div>
        </div>
      </section>


      <footer className="footer">
        <p>
          Contact Us: 106 &nbsp; | &nbsp; Emergency: 999 &nbsp; | &nbsp; Health
          Information: 16263
        </p>
        <p>© 2024 Ministry of Health and Family Welfare. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
