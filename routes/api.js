const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CostItem = require('../models/costItem');
const User = require('../models/user');

// Add a new cost item
router.post('/add', async (req, res) => {
  const { description, category, userId, sum, date } = req.body;

  // Validate required parameters
  if (!description || !category || !userId || sum === undefined) {
    return res.status(400).json({ error: 'Missing required parameters: description, category, userId, and sum' });
  }

  // Validate category
  const validCategories = ['food', 'health', 'housing', 'sport', 'education'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: `Invalid category. Valid categories are: ${validCategories.join(', ')}` });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const costItem = new CostItem({ description, category, userId, amount: sum, date: date || new Date() });
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
  const { id, month, year } = req.query;
  try {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const costItems = await CostItem.find({
      userId: id,
      date: { $gte: startDate, $lte: endDate },
    });

    const validCategories = ['food', 'health', 'housing', 'sport', 'education'];
    const groupedCosts = costItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push({
        sum: item.amount,
        day: item.date.getDate(),
        description: item.description
      });
      return acc;
    }, {});

    // Ensure all categories are included with default value of 0 if no cost items are found
    validCategories.forEach(category => {
      if (!groupedCosts[category]) {
        groupedCosts[category] = [{ sum: 0, day: null, description: 'No costs' }];
      }
    });

    res.json(groupedCosts);
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
