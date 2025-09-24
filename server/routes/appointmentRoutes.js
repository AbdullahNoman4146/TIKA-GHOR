import express from "express";
import { createAppointment, getUserAppointments } from "../controllers/appointmentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createAppointment);
router.get("/", authMiddleware, getUserAppointments);

export default router;
