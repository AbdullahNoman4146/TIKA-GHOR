import React, { useState } from "react";
import "./ApplicableVaccine.css";
import { useNavigate } from "react-router-dom";

function ApplicableVaccine() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        pregnancyStatus: "",
        chronicConditions: [],
        previousVaccinations: [],
        occupation: "",
        travelPlans: ""
    });
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);

    // Vaccine database with eligibility criteria
    const vaccineDatabase = [
        {
            name: "COVID-19 Vaccine",
            description: "Protection against COVID-19",
            eligibility: {
                minAge: 6,
                maxAge: 100,
                gender: "all",
                conditions: ["all"],
                notes: "Recommended for everyone 6 months and older"
            }
        },
        {
            name: "Influenza (Flu) Vaccine",
            description: "Annual protection against seasonal flu",
            eligibility: {
                minAge: 6,
                maxAge: 100,
                gender: "all",
                conditions: ["all"],
                notes: "Annual vaccination recommended"
            }
        },
        {
            name: "Hepatitis B Vaccine",
            description: "Protection against Hepatitis B virus",
            eligibility: {
                minAge: 0,
                maxAge: 100,
                gender: "all",
                conditions: ["all"],
                notes: "Recommended for all infants and unvaccinated adults"
            }
        },
        {
            name: "HPV Vaccine",
            description: "Protection against Human Papillomavirus",
            eligibility: {
                minAge: 9,
                maxAge: 45,
                gender: "all",
                conditions: ["all"],
                notes: "Most effective when given before exposure to HPV"
            }
        },
        {
            name: "Pneumococcal Vaccine",
            description: "Protection against pneumococcal disease",
            eligibility: {
                minAge: 65,
                maxAge: 100,
                gender: "all",
                conditions: ["diabetes", "heart_disease", "chronic_lung_disease"],
                notes: "Recommended for adults 65+ and those with chronic conditions"
            }
        },
        {
            name: "Tdap Vaccine",
            description: "Protection against Tetanus, Diphtheria, and Pertussis",
            eligibility: {
                minAge: 11,
                maxAge: 100,
                gender: "all",
                conditions: ["all"],
                notes: "Booster every 10 years, especially important for pregnant women"
            }
        },
        {
            name: "MMR Vaccine",
            description: "Protection against Measles, Mumps, and Rubella",
            eligibility: {
                minAge: 12,
                maxAge: 100,
                gender: "all",
                conditions: ["all"],
                pregnancy: "not_recommended",
                notes: "Not recommended during pregnancy"
            }
        },
        {
            name: "Varicella (Chickenpox) Vaccine",
            description: "Protection against Chickenpox",
            eligibility: {
                minAge: 12,
                maxAge: 100,
                gender: "all",
                conditions: ["all"],
                pregnancy: "not_recommended",
                notes: "For those who haven't had chickenpox"
            }
        },
        {
            name: "Meningococcal Vaccine",
            description: "Protection against meningococcal disease",
            eligibility: {
                minAge: 11,
                maxAge: 25,
                gender: "all",
                conditions: ["all"],
                notes: "Especially important for college students and military personnel"
            }
        },
        {
            name: "Travel Vaccines",
            description: "Various vaccines for international travel",
            eligibility: {
                minAge: 0,
                maxAge: 100,
                gender: "all",
                conditions: ["all"],
                travel: "required",
                notes: "Depends on travel destination and duration"
            }
        }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            if (name === "chronicConditions" || name === "previousVaccinations") {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                        ? [...prev[name], value]
                        : prev[name].filter(item => item !== value)
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const checkVaccineEligibility = () => {
        if (!formData.age || !formData.gender) {
            alert("Please fill in at least age and gender to get recommendations.");
            return;
        }

        const age = parseInt(formData.age);
        const applicableVaccines = [];

        vaccineDatabase.forEach(vaccine => {
            let isApplicable = true;
            let reasons = [];

            // Check age eligibility
            if (age < vaccine.eligibility.minAge || age > vaccine.eligibility.maxAge) {
                if (vaccine.name === "Pneumococcal Vaccine" && age < 65 && formData.chronicConditions.length > 0) {
                    // Exception for chronic conditions
                    const hasChronicCondition = formData.chronicConditions.some(condition =>
                        vaccine.eligibility.conditions.includes(condition)
                    );
                    if (!hasChronicCondition) {
                        isApplicable = false;
                        reasons.push(`Age requirement: ${vaccine.eligibility.minAge}-${vaccine.eligibility.maxAge} years or chronic conditions`);
                    }
                } else if (vaccine.name !== "Pneumococcal Vaccine") {
                    isApplicable = false;
                    reasons.push(`Age requirement: ${vaccine.eligibility.minAge}-${vaccine.eligibility.maxAge} years`);
                }
            }

            // Check pregnancy status for certain vaccines
            if (vaccine.eligibility.pregnancy === "not_recommended" && formData.pregnancyStatus === "pregnant") {
                isApplicable = false;
                reasons.push("Not recommended during pregnancy");
            }

            // Check travel requirements
            if (vaccine.eligibility.travel === "required" && formData.travelPlans !== "yes") {
                isApplicable = false;
                reasons.push("Only needed for international travel");
            }

            // Special case for Tdap during pregnancy
            if (vaccine.name === "Tdap Vaccine" && formData.pregnancyStatus === "pregnant") {
                reasons.push("Especially recommended during pregnancy (27-36 weeks)");
            }

            // Check if already vaccinated
            if (formData.previousVaccinations.includes(vaccine.name.toLowerCase().replace(/\s+/g, '_'))) {
                reasons.push("You may already be vaccinated - consult with healthcare provider for booster schedule");
            }

            if (isApplicable) {
                applicableVaccines.push({
                    ...vaccine,
                    reasons: reasons.length > 0 ? reasons : ["Meets all eligibility criteria"]
                });
            }
        });

        setResults(applicableVaccines);
        setShowResults(true);
    };

    const resetForm = () => {
        setFormData({
            age: "",
            gender: "",
            pregnancyStatus: "",
            chronicConditions: [],
            previousVaccinations: [],
            occupation: "",
            travelPlans: ""
        });
        setResults(null);
        setShowResults(false);
    };

    return (
        <div className="applicable-vaccine">

            <div className="container">
                <div className="header">
                    <h1>Find Your Applicable Vaccines</h1>
                    <p>Fill in your information below to discover which vaccines are recommended for you</p>
                </div>

                {!showResults ? (
                    <div className="form-section">
                        <form className="vaccine-form">
                            <div className="form-group">
                                <label htmlFor="age">Age *</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="120"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Gender *</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {formData.gender === "female" && (
                                <div className="form-group">
                                    <label htmlFor="pregnancyStatus">Pregnancy Status</label>
                                    <select
                                        id="pregnancyStatus"
                                        name="pregnancyStatus"
                                        value={formData.pregnancyStatus}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pregnant">Currently Pregnant</option>
                                        <option value="planning">Planning Pregnancy</option>
                                        <option value="not_applicable">Not Applicable</option>
                                    </select>
                                </div>
                            )}

                            <div className="form-group">
                                <label>Chronic Health Conditions</label>
                                <div className="checkbox-group">
                                    {["diabetes", "heart_disease", "chronic_lung_disease", "immunocompromised", "cancer"].map(condition => (
                                        <label key={condition} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="chronicConditions"
                                                value={condition}
                                                checked={formData.chronicConditions.includes(condition)}
                                                onChange={handleInputChange}
                                            />
                                            {condition.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Previous Vaccinations (if known)</label>
                                <div className="checkbox-group">
                                    {["covid-19_vaccine", "influenza_vaccine", "hepatitis_b_vaccine", "hpv_vaccine", "mmr_vaccine", "tdap_vaccine"].map(vaccine => (
                                        <label key={vaccine} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="previousVaccinations"
                                                value={vaccine}
                                                checked={formData.previousVaccinations.includes(vaccine)}
                                                onChange={handleInputChange}
                                            />
                                            {vaccine.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="occupation">Occupation</label>
                                <select
                                    id="occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Occupation</option>
                                    <option value="healthcare">Healthcare Worker</option>
                                    <option value="education">Education</option>
                                    <option value="student">Student</option>
                                    <option value="military">Military</option>
                                    <option value="travel">Travel Industry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="travelPlans">Do you have international travel plans?</label>
                                <select
                                    id="travelPlans"
                                    name="travelPlans"
                                    value={formData.travelPlans}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes, within the next 12 months</option>
                                    <option value="no">No travel plans</option>
                                    <option value="domestic">Only domestic travel</option>
                                </select>
                            </div>

                            <div className="button-group">
                                <button type="button" onClick={checkVaccineEligibility} className="check-btn">
                                    Check Applicable Vaccines
                                </button>
                                <button type="button" onClick={resetForm} className="reset-btn">
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="results-section">
                        <div className="results-header">
                            <h2>Your Vaccine Recommendations</h2>
                            <button onClick={() => setShowResults(false)} className="back-btn">
                                ← Back to Form
                            </button>
                        </div>

                        {results.length === 0 ? (
                            <div className="no-results">
                                <p>No specific vaccine recommendations based on your current information.</p>
                                <p>Please consult with a healthcare provider for personalized advice.</p>
                            </div>
                        ) : (
                            <div className="vaccine-results">
                                <div className="results-summary">
                                    <p>Based on your information, here are <strong>{results.length}</strong> vaccines that may be applicable for you:</p>
                                </div>

                                <div className="vaccine-grid">
                                    {results.map((vaccine, index) => (
                                        <div key={index} className="vaccine-card">
                                            <div className="vaccine-header">
                                                <h3>{vaccine.name}</h3>
                                                <span className="recommended-badge">Recommended</span>
                                            </div>
                                            <p className="vaccine-description">{vaccine.description}</p>
                                            <div className="vaccine-details">
                                                <h4>Why this is recommended for you:</h4>
                                                <ul>
                                                    {vaccine.reasons.map((reason, idx) => (
                                                        <li key={idx}>{reason}</li>
                                                    ))}
                                                </ul>
                                                <p className="vaccine-notes"><strong>Note:</strong> {vaccine.eligibility.notes}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="disclaimer">
                                    <h4>Important Disclaimer</h4>
                                    <p>
                                        This tool provides general vaccine recommendations based on standard guidelines.
                                        Always consult with a qualified healthcare provider before making vaccination decisions.
                                        Individual medical history, allergies, and other factors may affect vaccine suitability.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="action-buttons">
                            <button onClick={() => setShowResults(false)} className="modify-btn">
                                Modify Information
                            </button>
                            <button onClick={() => navigate("/vaccine-info")} className="learn-more-btn">
                                Learn More About Vaccines
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <footer className="footer">
                <p> Contact Us: 106 &nbsp; | &nbsp; Emergency: 999 &nbsp; | &nbsp; Health Information: 16263 </p>
                <p>© 2024 Ministry of Health and Family Welfare. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ApplicableVaccine;