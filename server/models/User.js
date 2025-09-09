import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    sex: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    thana: { type: String, required: true },
    postOffice: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    photo: { type: String },  // we’ll just store filename or base64 later
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

export default User;
