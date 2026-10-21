const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: "N/A" },
  businessType: { type: String, default: "Retail" },
  requirements: { type: String, default: "Custom ERP configuration" },
  preferredErp: { type: String, default: "General ERP" },
  status: {
    type: String,
    enum: ['new', 'contacted', 'demo_scheduled', 'quoted', 'won', 'lost'],
    default: 'new'
  },
  source: {
    type: String,
    enum: ['website', 'whatsapp', 'call'],
    default: 'website'
  },
  notes: { type: String, default: '' },
  assignedTo: { type: String, default: 'Unassigned' },
  quoteAmount: { type: Number, default: 0 },
  quoteDetails: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inquiry', inquirySchema);
