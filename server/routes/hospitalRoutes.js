import express from "express";
import { getHospital, saveHospital, getAllHospitals } from "../controllers/hospitalController.js";

const router = express.Router();

// Get all hospitals (Admin view)
router.get("/", getAllHospitals);

// Get hospital by email
router.get("/:email", getHospital);

// Save or update hospital (Admin or hospital itself)
router.post("/", saveHospital);

export default router;
