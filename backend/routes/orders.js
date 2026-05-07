const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  try {
    const { items, total, shippingInfo } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ message: 'No items in order' });

    const order = await Order.create({
      userId: req.user._id,
      items,
      total,
      shippingInfo
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;