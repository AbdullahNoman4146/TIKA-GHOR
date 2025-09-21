import User from "../models/User.js";
import Hospital from "../models/Hospital.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all users
export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new user (Patient signup)
export const newUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: error.message });
    }
};

// Get user by email
export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user (Admin / Hospital / Patient)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 🔹 Admin login using env variables at runtime
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
        const token = jwt.sign({ email, role: "Admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
            message: "Login successful",
            role: "Admin",
            email,
            token,
      });
        }

        // Hospital login
        const hospital = await Hospital.findOne({ email });
        if (hospital) {
      const isMatch = await bcrypt.compare(password, hospital.password);
      if (isMatch) {
        const token = jwt.sign({ email: hospital.email, role: "Hospital" }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
          message: "Login successful",
          role: "Hospital",
          email: hospital.email,
          name: hospital.name || "Hospital",
          token,
        });
            } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        }

        // Patient login
        const user = await User.findOne({ email });
        if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ email: user.email, role: "Patient" }, process.env.JWT_SECRET, { expiresIn: "1d" });
            return res.status(200).json({
            message: "Login successful",
            role: "Patient",
          email: user.email,
          name: user.name,
          token,
        });
      } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        }

        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
