import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // login email
    password: { type: String, required: true },            //Added password
    name: { type: String },
    address: { type: String },
    contact: { type: String },
    availableVaccines: [String], // array of vaccines
    openingHours: { type: String }
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;
