import User from "../models/User.js";

// ✅ Get all users
export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Create new user
export const newUser = async (req, res) => {
    try {
        console.log("📩 Received body:", req.body);
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        console.error("❌ Error saving user:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get single user by email
export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ message: error.message });
    }
};

// ✅ Login user (check email + password)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // ✅ Only send safe data (not password)
        res.json({
            email: user.email,
            name: user.name,
            role: req.body.role || "Patient", // fallback role
        });
    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ message: error.message });
    }
};
