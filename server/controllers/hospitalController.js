import Hospital from "../models/Hospital.js";

// ✅ Get hospital info by email
export const getHospital = async (req, res) => {
    try {
        const { email } = req.params;
        const hospital = await Hospital.findOne({ email });

        if (!hospital) {
            return res.status(200).json(null); // No data yet
        }

        res.json(hospital);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Save or Update hospital info
export const saveHospital = async (req, res) => {
    try {
        const { email } = req.body;

        let hospital = await Hospital.findOne({ email });
        if (hospital) {
            // update existing
            hospital.set(req.body);
            await hospital.save();
        } else {
            // create new
            hospital = new Hospital(req.body);
            await hospital.save();
        }

        res.status(200).json(hospital);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
