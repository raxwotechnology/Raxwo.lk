const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, default: '' },
    address: { type: String, default: '' }
  },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    priceLKR: { type: Number, required: true },
    priceUSD: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }],
  totalLKR: { type: Number, required: true },
  totalUSD: { type: Number, required: true },
  currency: { type: String, default: 'LKR' },
  paymentMethod: {
    type: String,
    enum: ['payhere', 'stripe', 'bank_transfer'],
    default: 'payhere'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'verified', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Active', 'Fulfilled'],
    default: 'Pending'
  },
  licenseKey: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  bankSlipUrl: { type: String, default: '' },
  bankSlipNote: { type: String, default: '' },
  paidAt: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
