import express from 'express';
import { createNotice, getAllNotices, deleteNotice } from '../controllers/NoticeController.js';

const router = express.Router();

// Create a new notice
router.post('/', createNotice);

// Get all notices
router.get('/', getAllNotices);

// Delete a notice
router.delete('/:id', deleteNotice);

export default router;