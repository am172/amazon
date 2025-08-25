// models/Delivery.js
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  name: String,
  address: String,
  age: Number,
  gender: String,
  location: String, // ممكن نعملها latitude + longitude
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);
