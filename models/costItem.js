const mongoose = require('mongoose');

/**
 * CostItem schema definition.
 * @typedef {Object} CostItem
 * @property {string} userId - The custom ID of the user associated with the cost item.
 * @property {string} description - The description of the cost item.
 * @property {string} category - The category of the cost item.
 * @property {number} amount - The amount of the cost item.
 * @property {Date} date - The date of the cost item.
 */
const costItemSchema = new mongoose.Schema({
  userId: String,
  description: String,
  category: {
    type: String,
    enum: ['food', 'health', 'housing', 'sport', 'education'],
    required: true,
  },
  amount: Number,
  date: Date,
});

module.exports = mongoose.model('CostItem', costItemSchema);
