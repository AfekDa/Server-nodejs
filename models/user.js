const mongoose = require('mongoose');

/**
 * User schema definition.
 * @typedef {Object} User
 * @property {string} _id - The custom ID of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {Date} birthday - The birthday of the user.
 * @property {string} maritalStatus - The marital status of the user.
 * @property {number} totalCosts - The total costs associated with the user.
 */
const userSchema = new mongoose.Schema({
  _id: String,
  firstName: String,
  lastName: String,
  birthday: Date,
  maritalStatus: String,
  totalCosts: Number,
});

module.exports = mongoose.model('User', userSchema);
