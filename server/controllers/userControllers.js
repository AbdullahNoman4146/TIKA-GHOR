import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const newUser = async (req, res) => {
    try {
        console.log("📩 Received body:", req.body);
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        // ✅ Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }

        console.error("❌ Error saving user:", error);
        res.status(500).json({ message: error.message });
    }
};
