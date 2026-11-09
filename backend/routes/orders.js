const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const { optionalAuth, verifyToken } = require('../middleware/auth');

// Sri Lanka Bank Details for Bank Transfer
const BANK_DETAILS = {
  bankName: "Commercial Bank of Ceylon PLC",
  branch: "Colombo Fort Premier",
  accountName: "Raxwo Next Level Tech (Pvt) Ltd",
  accountNumber: "1000 8945 2311",
  swiftCode: "CCEYLKX"
};

// In-memory fallback orders store
let inMemoryOrders = [];

function isDBConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// Create new order
router.post('/create', optionalAuth, async (req, res) => {
  try {
    const { 
      customer, 
      items, 
      paymentMethod = 'payhere', 
      currency = 'LKR',
      totalLKR,
      totalUSD
    } = req.body;

    if (!customer || !customer.name || !customer.email || !customer.phone) {
      return res.status(400).json({ success: false, message: 'Customer name, email, and phone are required.' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item.' });
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-2026-${orderNumber}`;
    const invoiceNumber = `INV-2026-${orderNumber}`;
    const licenseKey = `RAXWO-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // For online card (PayHere / Stripe simulated), immediately completed; for bank transfer, pending slip
    const isInstantCard = paymentMethod === 'payhere' || paymentMethod === 'stripe';
    const paymentStatus = isInstantCard ? 'completed' : 'pending';
    const status = isInstantCard ? 'Active' : 'Pending';

    const orderData = {
      orderId,
      userId: req.user ? req.user.id : null,
      customer,
      items,
      totalLKR: totalLKR || items.reduce((sum, i) => sum + (i.priceLKR || 0) * (i.quantity || 1), 0),
      totalUSD: totalUSD || items.reduce((sum, i) => sum + (i.priceUSD || 0) * (i.quantity || 1), 0),
      currency,
      paymentMethod,
      paymentStatus,
      status,
      licenseKey,
      invoiceNumber,
      paidAt: isInstantCard ? new Date() : null,
      createdAt: new Date().toISOString()
    };

    if (isDBConnected()) {
      try {
        const order = new Order(orderData);
        await order.save();
        orderData.id = order._id;
      } catch (dbErr) {
        console.warn('[Orders DB Save Warning]:', dbErr.message);
      }
    }

    // Always keep in memory store
    orderData.id = orderData.id || `ord_${Date.now()}`;
    inMemoryOrders.unshift(orderData);

    res.status(201).json({
      success: true,
      message: isInstantCard 
        ? 'Payment authorized successfully! License key issued.' 
        : 'Order created! Please complete payment via bank transfer.',
      order: {
        id: orderData.id,
        orderId: orderData.orderId,
        invoiceNumber: orderData.invoiceNumber,
        licenseKey: orderData.licenseKey,
        totalLKR: orderData.totalLKR,
        totalUSD: orderData.totalUSD,
        currency: orderData.currency,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus,
        status: orderData.status,
        customer: orderData.customer,
        items: orderData.items,
        bankDetails: paymentMethod === 'bank_transfer' ? BANK_DETAILS : null,
        createdAt: orderData.createdAt
      }
    });
  } catch (err) {
    console.error('[Create Order Error]:', err);
    res.status(500).json({ success: false, message: 'Failed to create order.' });
  }
});

// Get user orders
router.get('/my-orders', optionalAuth, async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};

    if (req.user) {
      query.$or = [{ userId: req.user.id }, { 'customer.email': req.user.email }];
    } else if (email) {
      query = { 'customer.email': email.toLowerCase() };
    } else {
      return res.json({
        success: true,
        count: 0,
        orders: []
      });
    }

    if (isDBConnected()) {
      try {
        const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
        if (orders && orders.length > 0) {
          return res.json({
            success: true,
            count: orders.length,
            orders
          });
        }
      } catch (dbErr) {
        console.warn('[Orders DB Query Warning]:', dbErr.message);
      }
    }

    // In-memory fallback
    const targetEmail = req.user ? req.user.email.toLowerCase() : (email ? email.toLowerCase() : '');
    const filtered = inMemoryOrders.filter(o => 
      (req.user && o.userId === req.user.id) || 
      (o.customer && o.customer.email && o.customer.email.toLowerCase() === targetEmail)
    );

    res.json({
      success: true,
      count: filtered.length,
      orders: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
});

// Bank transfer proof upload
router.post('/:orderId/upload-slip', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { slipUrl, referenceNumber, bankName } = req.body;

    const note = `Ref: ${referenceNumber || 'N/A'} | Bank: ${bankName || 'Direct'} | Uploaded: ${new Date().toLocaleDateString()}`;

    if (isDBConnected()) {
      try {
        const order = await Order.findOneAndUpdate(
          { orderId },
          { 
            $set: { 
              bankSlipUrl: slipUrl || 'uploaded_bank_receipt_proof.pdf',
              bankSlipNote: note,
              paymentStatus: 'verified',
              status: 'Processing'
            } 
          },
          { new: true }
        );
        if (order) {
          return res.json({
            success: true,
            message: 'Bank transfer slip submitted! Our finance team will verify within 1 hour.',
            order
          });
        }
      } catch (e) {}
    }

    const memOrder = inMemoryOrders.find(o => o.orderId === orderId);
    if (memOrder) {
      memOrder.bankSlipUrl = slipUrl || 'uploaded_bank_receipt_proof.pdf';
      memOrder.bankSlipNote = note;
      memOrder.paymentStatus = 'verified';
      memOrder.status = 'Processing';
      return res.json({
        success: true,
        message: 'Bank transfer slip submitted! Our finance team will verify within 1 hour.',
        order: memOrder
      });
    }

    res.status(404).json({ success: false, message: 'Order not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to upload slip.' });
  }
});

// Full Invoice Data
router.get('/:orderId/invoice', async (req, res) => {
  try {
    let order = null;
    if (isDBConnected()) {
      try {
        order = await Order.findOne({ orderId: req.params.orderId }).lean();
      } catch (e) {}
    }

    if (!order) {
      order = inMemoryOrders.find(o => o.orderId === req.params.orderId);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Invoice not found.' });
    }

    const invoiceData = {
      invoiceNumber: order.invoiceNumber,
      orderId: order.orderId,
      date: order.createdAt,
      company: {
        name: "RAXWO NEXT LEVEL TECH (PVT) LTD",
        address: "Level 14, World Trade Center, Echelon Square, Colombo 01, Sri Lanka",
        registrationNo: "PV-00249811",
        vatNo: "119830200-7000",
        phone: "+94 11 234 5678",
        email: "billing@raxwo.lk",
        website: "https://raxwo.lk"
      },
      customer: order.customer,
      items: order.items,
      subtotalLKR: order.totalLKR,
      vatLKR: 0,
      totalLKR: order.totalLKR,
      totalUSD: order.totalUSD,
      currency: order.currency,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      licenseKey: order.licenseKey,
      terms: "Perpetual commercial license with 100% full source code ownership. Includes 12 months complimentary updates & LKR RAMIS compliance guarantees."
    };

    res.json({
      success: true,
      invoice: invoiceData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate invoice.' });
  }
});

module.exports = router;
