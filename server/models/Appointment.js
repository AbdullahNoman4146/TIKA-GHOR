import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
    vaccine: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    dose: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
