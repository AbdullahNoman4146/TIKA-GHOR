import React, { useState } from "react";
import "./Signup.css";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        sex: "",
        fatherName: "",
        motherName: "",
        division: "",
        district: "",
        thana: "",
        postOffice: "",
        bloodGroup: "",
        photo: null,
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // 📌 Location data (example, you can expand later)
    const locationData = {
        Dhaka: {
            Dhaka: {
                "Dhanmondi": ["Kalabagan PO", "Satmasjid PO"],
                "Mirpur": ["Mirpur-1 PO", "Mirpur-10 PO"],
            },
            Gazipur: {
                "Tongi": ["Tongi PO", "Gazipur Sadar PO"],
            },
        },
        Chattogram: {
            Chattogram: {
                "Pahartali": ["Pahartali PO", "Nasirabad PO"],
                "Kotwali": ["Anderkilla PO", "Chawkbazar PO"],
            },
            CoxsBazar: {
                "Teknaf": ["Teknaf PO", "Cox Sadar PO"],
            },
        },
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // 🔗 TODO: connect this with backend / database
        // 🔗 TODO: redirect to Login page after successful signup
    };

    return (
        <div className="signup-container">
            <h2>Patient Signup - TIKA GHOR</h2>
            <form onSubmit={handleSubmit} className="signup-form">

                <label>Full Name:</label>
                <input type="text" name="name" onChange={handleChange} required />

                <label>Date of Birth:</label>
                <input type="date" name="dob" onChange={handleChange} required />

                <label>Sex:</label>
                <select name="sex" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label>Father's Name:</label>
                <input type="text" name="fatherName" onChange={handleChange} required />

                <label>Mother's Name:</label>
                <input type="text" name="motherName" onChange={handleChange} required />

                {/* Division Dropdown */}
                <label>Division:</label>
                <select
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Division</option>
                    {Object.keys(locationData).map((div) => (
                        <option key={div} value={div}>
                            {div}
                        </option>
                    ))}
                </select>

                {/* District Dropdown */}
                <label>District:</label>
                <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    disabled={!formData.division}
                >
                    <option value="">Select District</option>
                    {formData.division &&
                        Object.keys(locationData[formData.division]).map((dis) => (
                            <option key={dis} value={dis}>
                                {dis}
                            </option>
                        ))}
                </select>

                {/* Thana Dropdown */}
                <label>Thana:</label>
                <select
                    name="thana"
                    value={formData.thana}
                    onChange={handleChange}
                    required
                    disabled={!formData.district}
                >
                    <option value="">Select Thana</option>
                    {formData.division &&
                        formData.district &&
                        Object.keys(
                            locationData[formData.division][formData.district]
                        ).map((th) => (
                            <option key={th} value={th}>
                                {th}
                            </option>
                        ))}
                </select>

                {/* Post Office Dropdown */}
                <label>Post Office:</label>
                <select
                    name="postOffice"
                    value={formData.postOffice}
                    onChange={handleChange}
                    required
                    disabled={!formData.thana}
                >
                    <option value="">Select Post Office</option>
                    {formData.division &&
                        formData.district &&
                        formData.thana &&
                        locationData[formData.division][formData.district][
                            formData.thana
                        ].map((po) => (
                            <option key={po} value={po}>
                                {po}
                            </option>
                        ))}
                </select>

                <label>Blood Group:</label>
                <select name="bloodGroup" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>

                <label>Photo:</label>
                <input type="file" name="photo" accept="image/*" onChange={handleChange} />

                <label>Mobile Number:</label>
                <input type="tel" name="mobile" onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />

                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" onChange={handleChange} required />

                <button type="submit">Signup</button>
            </form>

            {/* 🔗 Here connect with Login page */}
            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}

export default Signup;