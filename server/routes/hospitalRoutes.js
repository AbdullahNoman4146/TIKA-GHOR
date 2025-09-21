import express from "express";
import { getHospital, saveHospital, getAllHospitals } from "../controllers/hospitalController.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllHospitals); // Only admin
router.get("/:email", authMiddleware, getHospital); // Only logged-in hospital or admin
router.post("/", authMiddleware, saveHospital);

export default router;
