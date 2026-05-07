const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }).limit(50);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim().length === 0)
      return res.status(400).json({ message: 'Comment text required' });

    const comment = await Comment.create({
      userId: req.user._id,
      username: req.user.username,
      text: text.trim()
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Not found' });
    if (comment.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await comment.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;