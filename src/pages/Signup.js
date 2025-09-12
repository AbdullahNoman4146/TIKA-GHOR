import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    // Location data (Division → District → Thana → Post Office)
    const locationData = {
        Dhaka: {
            Dhaka: {
                Dhanmondi: ["Dhanmondi PO", "Kalabagan PO"],
                Gulshan: ["Gulshan PO", "Banani PO"],
                Mirpur: ["Mirpur-1 PO", "Mirpur-10 PO"],
                Uttara: ["Uttara Sector 3 PO", "Uttara Sector 10 PO"],
            },
            Gazipur: {
                Tongi: ["Tongi PO", "Cherag Ali PO"],
                Sreepur: ["Sreepur PO", "Bormi PO"],
                Kaliakair: ["Kaliakair PO", "Mouchak PO"],
            },
        },
        Chittagong: {
            Chattogram: {
                Pahartali: ["Pahartali PO", "Khulshi PO"],
                Panchlaish: ["Panchlaish PO", "Nasirabad PO"],
                Kotwali: ["Kotwali PO", "Anderkilla PO"],
            },
            CoxsBazar: {
                Teknaf: ["Teknaf PO", "Shah Porir Dwip PO"],
                Ukhiya: ["Ukhiya PO", "Balukhali PO"],
                Ramu: ["Ramu PO", "Chakmarkul PO"],
            },
        },
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (name === "division") {
            setFormData({
                ...formData,
                division: value,
                district: "",
                thana: "",
                postOffice: "",
            });
        } else if (name === "district") {
            setFormData({
                ...formData,
                district: value,
                thana: "",
                postOffice: "",
            });
        } else if (name === "thana") {
            setFormData({
                ...formData,
                thana: value,
                postOffice: "",
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "file" ? files[0].name : value,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // 1. Name, Father, Mother name: only letters, no numbers/spaces-only
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!formData.name.trim() || !nameRegex.test(formData.name.trim())) {
            newErrors.name = "Name must only contain letters and cannot be blank.";
        }
        if (!formData.fatherName.trim() || !nameRegex.test(formData.fatherName.trim())) {
            newErrors.fatherName = "Father's name must only contain letters.";
        }
        if (!formData.motherName.trim() || !nameRegex.test(formData.motherName.trim())) {
            newErrors.motherName = "Mother's name must only contain letters.";
        }

        // 2. Password validation
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters, include a digit and a special character.";
        }

        // 3. Date of Birth cannot be in future
        const today = new Date();
        if (!formData.dob || new Date(formData.dob) > today) {
            newErrors.dob = "Date of Birth cannot be in the future.";
        }

        // 4. Mobile number validation (Bangladeshi operators only)
        const mobileRegex = /^(013|014|015|016|017|018|019)\d{8}$/;
        if (!mobileRegex.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid Bangladeshi mobile number (e.g. 017xxxxxxxx).";
        }


        // 5. Confirm password match
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        // 6. Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // 7. No blank input check for required fields
        const requiredFields = [
            "name",
            "dob",
            "sex",
            "fatherName",
            "motherName",
            "division",
            "district",
            "thana",
            "postOffice",
            "bloodGroup",
            "mobile",
            "email",
            "password",
            "confirmPassword",
        ];
        requiredFields.forEach((field) => {
            if (!formData[field] || !formData[field].toString().trim()) {
                newErrors[field] = "This field is required.";
            }
        });

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

                alert("Signup successful! Redirecting to login...");
                navigate("/login");
            } catch (error) {
                if (error.response && error.response.data.message) {
                    setServerError(error.response.data.message);
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

                {/* Division dropdown */}
                <label>Division:</label>
                <select name="division" value={formData.division} onChange={handleChange} required>
                    <option value="">Select Division</option>
                    {Object.keys(locationData).map((division) => (
                        <option key={division} value={division}>
                            {division}
                        </option>
                    ))}
                </select>
                {errors.division && <p className="error">{errors.division}</p>}

                {/* District dropdown */}
                <label>District:</label>
                <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.division}
                    required
                >
                    <option value="">Select District</option>
                    {formData.division &&
                        Object.keys(locationData[formData.division]).map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                </select>
                {errors.district && <p className="error">{errors.district}</p>}

                {/* Thana dropdown */}
                <label>Thana:</label>
                <select
                    name="thana"
                    value={formData.thana}
                    onChange={handleChange}
                    disabled={!formData.district}
                    required
                >
                    <option value="">Select Thana</option>
                    {formData.division &&
                        formData.district &&
                        Object.keys(locationData[formData.division][formData.district]).map((thana) => (
                            <option key={thana} value={thana}>
                                {thana}
                            </option>
                        ))}
                </select>
                {errors.thana && <p className="error">{errors.thana}</p>}

                {/* Post Office dropdown */}
                <label>Post Office:</label>
                <select
                    name="postOffice"
                    value={formData.postOffice}
                    onChange={handleChange}
                    disabled={!formData.thana}
                    required
                >
                    <option value="">Select Post Office</option>
                    {formData.division &&
                        formData.district &&
                        formData.thana &&
                        locationData[formData.division][formData.district][formData.thana].map((po) => (
                            <option key={po} value={po}>
                                {po}
                            </option>
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
                <input type="file" name="photo" onChange={handleChange} />

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
        </div>
    );
}

export default Signup;
