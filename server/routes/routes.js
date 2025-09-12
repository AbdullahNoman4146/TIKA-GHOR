//routes.js
import express from "express";
import { getUser, newUser, getUserByEmail } from "../controllers/userControllers.js";
import { loginUser } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", newUser);
router.get("/:email", getUserByEmail);
router.post("/login", loginUser);

export default router;
