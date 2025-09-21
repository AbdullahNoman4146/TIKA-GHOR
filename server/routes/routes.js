//routes.js
import express from "express";
import { getUser, newUser, getUserByEmail } from "../controllers/userControllers.js";
import { loginUser } from "../controllers/userControllers.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getUser); // Only admin can get all users
router.post("/", newUser); // Signup stays public
router.get("/:email", authMiddleware, getUserByEmail); // Only logged-in user or admin
router.post("/login", loginUser); // Login stays public

export default router;
