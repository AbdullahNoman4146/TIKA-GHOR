import express from "express";
import { getHospital, saveHospital } from "../controllers/hospitalController.js";

const router = express.Router();

// Get hospital by email
router.get("/:email", getHospital);

// Save new hospital (with password now)
router.post("/", saveHospital);

export default router;
