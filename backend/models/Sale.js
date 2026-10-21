const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  customer: { type: String, default: "Walk-in Customer" },
  itemsCount: { type: Number, default: 1 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sale', saleSchema);
