import express from 'express';
import { createNotice, getAllNotices, deleteNotice } from '../controllers/NoticeController.js';
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post('/', authMiddleware, adminOnly, createNotice); // Only admin
router.get('/', getAllNotices); // Public notices
router.delete('/:id', authMiddleware, adminOnly, deleteNotice); // Only admin

export default router;