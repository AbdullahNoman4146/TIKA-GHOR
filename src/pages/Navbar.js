// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div
                className="nav-left"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
            >
                TIKA GHOR
            </div>
            <div className="nav-right">
                {!isLoggedIn ? (
                    <button onClick={() => navigate("/login")}>Login</button>
                ) : (
                    <button onClick={() => navigate("/profile")}>Profile</button>
                )}
                <button onClick={() => navigate("/notices")}>Notice Panel</button>
                <button onClick={() => navigate("/vaccine-info")}>
                    Vaccine Information
                </button>
                <button onClick={() => navigate("/applicable-vaccine")}>
                    Applicable Vaccine
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
