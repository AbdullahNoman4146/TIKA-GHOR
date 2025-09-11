import express from "express";
import { getHospital, saveHospital } from "../controllers/hospitalController.js";

const router = express.Router();

router.get("/:email", getHospital);
router.post("/", saveHospital);

export default router;
