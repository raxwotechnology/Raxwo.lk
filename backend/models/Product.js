const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  subtitle: { type: String },
  category: { type: String, required: true },
  tagline: { type: String },
  fullDescription: { type: String },
  priceLKR: { type: Number, required: true },
  priceUSD: { type: Number, required: true },
  badge: { type: String },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 50 },
  iconColor: { type: String },
  features: [{ type: String }],
  audience: [{ type: String }],
  techStack: [{ type: String }],
  demoUrl: { type: String },
  image: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
