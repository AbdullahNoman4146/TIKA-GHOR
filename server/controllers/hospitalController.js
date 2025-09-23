import Hospital from "../models/Hospital.js";
import bcrypt from "bcrypt";

// Get all hospitals (exclude admin)
export const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find({
            email: { $ne: "admin@tikaghor.com" },
        });
        res.status(200).json(hospitals);
    } catch (err) {
        console.error("❌ Error fetching hospitals:", err);
        res.status(500).json({ message: err.message });
    }
};

// Get hospital info by email (admin won't exist in DB)
export const getHospital = async (req, res) => {
    try {
        const { email } = req.params;

        // If admin email requested, return null
        if (email === "admin@tikaghor.com") {
            return res.status(200).json(null);
        }

        const hospital = await Hospital.findOne({ email });
        res.json(hospital);
    } catch (err) {
        console.error("❌ Error fetching hospital:", err);
        res.status(500).json({ message: err.message });
    }
};

// Save or update hospital
export const saveHospital = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Block creating admin as hospital
        if (email === "admin@tikaghor.com") {
            return res
                .status(403)
                .json({ message: "Cannot create admin in hospitals" });
        }

        let hospital = await Hospital.findOne({ email });

        if (hospital) {
            // Update existing hospital
            let hashedPassword = hospital.password;

            if (
                password &&
                !(await bcrypt.compare(password, hospital.password))
            ) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            hospital.set({
                ...req.body,
                ...(hashedPassword && { password: hashedPassword }),
            });
            await hospital.save();
        } else {
            // Create new hospital
            let hashedPassword;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            hospital = new Hospital({
                ...req.body,
                ...(hashedPassword && { password: hashedPassword }),
            });
            await hospital.save();
        }

        res.status(200).json(hospital);
    } catch (err) {
        console.error("❌ Error saving hospital:", err);
        res.status(500).json({ message: err.message });
    }
};
