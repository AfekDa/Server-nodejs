const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CostItem = require('../models/costItem');
const User = require('../models/user');

// Add a new cost item
router.post('/add', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const costItem = new CostItem(req.body);
    await costItem.save({ session });

    // Update the user's totalCosts
    await User.findByIdAndUpdate(
      costItem.userId,
      { $inc: { totalCosts: costItem.amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    res.json(costItem);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: error.message });
  }
});

// Get monthly report
router.get('/report', async (req, res) => {
  const { userId, month, year } = req.query;
  try {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const costItems = await CostItem.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });
    res.json(costItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all cost items
router.get('/costItems', async (req, res) => {
  try {
    const costItems = await CostItem.find();
    res.json(costItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user details.
 * @route GET /api/users/:id
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get developers team
router.get('/about', (req, res) => {
  const team = [
    { firstName: 'Afek', lastName: 'David' },
    { firstName: 'Shai', lastName: 'Hanoni' },
  ];
  res.json(team);
});

module.exports = router;
