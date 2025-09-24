import express from "express";
import { getHospital, saveHospital, getAllHospitals, getAllHospitalsPublic } from "../controllers/hospitalController.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, adminOnly, getAllHospitals);
router.get("/public", getAllHospitalsPublic); // <-- must be before :email
router.get("/:email", authMiddleware, getHospital);
router.post("/", authMiddleware, saveHospital);


export default router;
