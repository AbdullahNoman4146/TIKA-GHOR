import Notice from '../models/Notice.js';

// Create a new notice
export const createNotice = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newNotice = new Notice({ title, content, author });
    await newNotice.save();
    res.status(201).json({ message: 'Notice created successfully', notice: newNotice });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notice', error: error.message });
  }
};

// Get all notices
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices', error: error.message });
  }
};

// Delete a notice
export const deleteNotice = async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
    if (!deletedNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notice', error: error.message });
  }
};