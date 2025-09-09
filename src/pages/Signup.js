import React, { useState } from "react";
import axios from "axios";
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
        photo: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0].name : value, // only filename for now
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        setSuccessMsg("");

        if (validateForm()) {
            try {
                const res = await axios.post("http://localhost:5000/api/user", formData);
                console.log("✅ User saved:", res.data);
                setSuccessMsg("Signup successful!");
            } catch (error) {
                if (error.response && error.response.data.message) {
                    setServerError(error.response.data.message); // show backend error
                } else {
                    setServerError("Something went wrong. Please try again.");
                }
                console.error("❌ Error saving user:", error);
            }
        }
    };

    return (
        <div className="signup-container">
            <h2 id="heading">Patient Signup</h2>
            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
            {serverError && <p style={{ color: "red" }}>{serverError}</p>}

            <form onSubmit={handleSubmit} className="signup-form">
                <label>Full Name:</label>
                <input type="text" name="name" onChange={handleChange} required />
                {errors.name && <p className="error">{errors.name}</p>}

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

                <label>Division:</label>
                <input type="text" name="division" onChange={handleChange} required />

                <label>District:</label>
                <input type="text" name="district" onChange={handleChange} required />

                <label>Thana:</label>
                <input type="text" name="thana" onChange={handleChange} required />

                <label>Post Office:</label>
                <input type="text" name="postOffice" onChange={handleChange} required />

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
                <input type="file" name="photo" onChange={handleChange} />

                <label>Mobile Number:</label>
                <input type="tel" name="mobile" onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />

                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" onChange={handleChange} required />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
