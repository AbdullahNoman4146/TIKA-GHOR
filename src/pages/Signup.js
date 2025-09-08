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

    const [errors, setErrors] = useState({});

    const locationData = {
        Dhaka: {
            Dhaka: {
                Dhanmondi: ["Kalabagan PO", "Satmasjid PO"],
                Mirpur: ["Mirpur-1 PO", "Mirpur-10 PO"],
            },
            Gazipur: {
                Tongi: ["Tongi PO", "Gazipur Sadar PO"],
            },
        },
        Chattogram: {
            Chattogram: {
                Pahartali: ["Pahartali PO", "Nasirabad PO"],
                Kotwali: ["Anderkilla PO", "Chawkbazar PO"],
            },
            CoxsBazar: {
                Teknaf: ["Teknaf PO", "Cox Sadar PO"],
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

    //validation function
    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== "photo") {
                newErrors[key] = "This field is required";
            }
        });

        if (formData.email && !emailPattern.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (formData.password) {
            if (formData.password.length < 7) {
                newErrors.password = "Password must be at least 7 characters";
            }
            if (!/[A-Za-z]/.test(formData.password) || !/[0-9!@#$%^&*]/.test(formData.password)) {
                newErrors.password = "Password must include letters and numbers/symbols";
            }
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("✅ Valid data submitted:", formData);
            // place to connect with backend
        } else {
            console.log("❌ Form has errors");
        }
    };

    return (
        <div className="signup-container">
            <h2 id="heading">Patient Signup</h2>
            <form onSubmit={handleSubmit} className="signup-form">

                <label>Full Name:</label>
                <input type="text" name="name" onChange={handleChange} required />
                {errors.name && <p className="error">{errors.name}</p>}

                <label>Date of Birth:</label>
                <input type="date" name="dob" onChange={handleChange} required />
                {errors.dob && <p className="error">{errors.dob}</p>}

                <label>Sex:</label>
                <select name="sex" onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.sex && <p className="error">{errors.sex}</p>}

                <label>Father's Name:</label>
                <input type="text" name="fatherName" onChange={handleChange} required />
                {errors.fatherName && <p className="error">{errors.fatherName}</p>}

                <label>Mother's Name:</label>
                <input type="text" name="motherName" onChange={handleChange} required />
                {errors.motherName && <p className="error">{errors.motherName}</p>}

                <label>Division:</label>
                <select name="division" value={formData.division} onChange={handleChange} required>
                    <option value="">Select Division</option>
                    {Object.keys(locationData).map((div) => (
                        <option key={div} value={div}>{div}</option>
                    ))}
                </select>
                {errors.division && <p className="error">{errors.division}</p>}

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
                            <option key={dis} value={dis}>{dis}</option>
                        ))}
                </select>
                {errors.district && <p className="error">{errors.district}</p>}

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
                        Object.keys(locationData[formData.division][formData.district]).map((th) => (
                            <option key={th} value={th}>{th}</option>
                        ))}
                </select>
                {errors.thana && <p className="error">{errors.thana}</p>}

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
                        locationData[formData.division][formData.district][formData.thana].map((po) => (
                            <option key={po} value={po}>{po}</option>
                        ))}
                </select>
                {errors.postOffice && <p className="error">{errors.postOffice}</p>}

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
                {errors.bloodGroup && <p className="error">{errors.bloodGroup}</p>}

                <label>Photo:</label>
                <input type="file" name="photo" accept="image/*" onChange={handleChange} />

                <label>Mobile Number:</label>
                <input type="tel" name="mobile" onChange={handleChange} required />
                {errors.mobile && <p className="error">{errors.mobile}</p>}

                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />
                {errors.email && <p className="error">{errors.email}</p>}

                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} required />
                {errors.password && <p className="error">{errors.password}</p>}

                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" onChange={handleChange} required />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <button type="submit">Signup</button>
            </form>

            <p>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}

export default Signup;
