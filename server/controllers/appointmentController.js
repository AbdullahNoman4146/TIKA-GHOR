import Appointment from "../models/Appointment.js";
import Hospital from "../models/Hospital.js";

// Create new appointment
export const createAppointment = async (req, res) => {
    try {
        const { hospitalId, vaccine, date, time } = req.body;
        const userId = req.user.id; // from authMiddleware

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        // Check if vaccine is available at hospital
        if (!hospital.vaccines.includes(vaccine)) {
            return res.status(400).json({ message: "Vaccine not available in this hospital" });
        }

        const appointment = new Appointment({
            user: userId,
            hospital: hospitalId,
            vaccine,
            date,
            time
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get appointments for logged-in user
export const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id })
            .populate("hospital", "name")
            .sort({ date: -1 });

        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
