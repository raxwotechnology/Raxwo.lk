const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');
const Order = require('../models/Order');
const User = require('../models/User');
const { verifyToken, requireRole } = require('../middleware/auth');

// All admin routes require authentication and either 'super_admin' or 'sales_admin' role
router.use(verifyToken);
router.use(requireRole(['super_admin', 'sales_admin']));

// 1. Platform Analytics
router.get('/analytics', async (req, res) => {
  try {
    const [totalProducts, inquiries, orders, usersCount] = await Promise.all([
      Product.countDocuments(),
      Inquiry.find().lean(),
      Order.find().lean(),
      User.countDocuments()
    ]);

    // Calculate revenue from completed/verified orders
    const completedOrders = orders.filter(o => o.paymentStatus === 'completed' || o.paymentStatus === 'verified');
    const totalRevenueLKR = completedOrders.reduce((sum, o) => sum + (o.totalLKR || 0), 0);

    // Lead CRM pipeline breakdown
    const leadsPipeline = {
      new: inquiries.filter(i => i.status === 'new').length,
      contacted: inquiries.filter(i => i.status === 'contacted').length,
      demo_scheduled: inquiries.filter(i => i.status === 'demo_scheduled').length,
      quoted: inquiries.filter(i => i.status === 'quoted').length,
      won: inquiries.filter(i => i.status === 'won').length,
      lost: inquiries.filter(i => i.status === 'lost').length,
    };

    const conversionRate = inquiries.length > 0 
      ? Math.round((leadsPipeline.won / inquiries.length) * 100) 
      : 0;

    res.json({
      success: true,
      data: {
        summary: {
          totalProducts,
          totalLeads: inquiries.length,
          totalOrders: orders.length,
          completedOrdersCount: completedOrders.length,
          totalRevenueLKR,
          conversionRate: `${conversionRate}%`,
          totalUsers: usersCount
        },
        leadsPipeline,
        recentInquiries: inquiries.slice(-5).reverse(),
        recentOrders: orders.slice(-5).reverse()
      }
    });
  } catch (err) {
    console.error('[Admin Analytics Error]:', err);
    res.status(500).json({ success: false, message: 'Failed to compute analytics.' });
  }
});

// 2. CRM Leads & Inquiries
router.get('/inquiries', async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { preferredErp: { $regex: search, $options: 'i' } }
      ];
    }

    const inquiries = await Inquiry.find(filter).sort({ submittedAt: -1 }).lean();
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch CRM leads.' });
  }
});

router.patch('/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, assignedTo, quoteAmount, quoteDetails } = req.body;

    const updated = await Inquiry.findOneAndUpdate(
      { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id: id }] },
      { 
        $set: {
          ...(status && { status }),
          ...(notes !== undefined && { notes }),
          ...(assignedTo && { assignedTo }),
          ...(quoteAmount !== undefined && { quoteAmount }),
          ...(quoteDetails !== undefined && { quoteDetails })
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update lead.' });
  }
});

// 3. Custom Quotation Generator
router.post('/quotes', async (req, res) => {
  try {
    const { inquiryId, customerName, customerEmail, customerPhone, items, discountLKR = 0, notes } = req.body;
    
    const subtotal = (items || []).reduce((sum, item) => sum + (Number(item.priceLKR) || 0) * (item.quantity || 1), 0);
    const total = Math.max(0, subtotal - (Number(discountLKR) || 0));

    const quoteId = `QUO-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const quoteData = {
      quoteId,
      customerName,
      customerEmail,
      customerPhone,
      items,
      subtotal,
      discountLKR,
      totalLKR: total,
      notes: notes || 'Valid for 30 days. Includes source code ownership & 12-month technical SLA.',
      createdBy: req.user.name,
      createdAt: new Date().toISOString()
    };

    // If attached to an inquiry, update it
    if (inquiryId) {
      await Inquiry.findOneAndUpdate(
        { $or: [{ _id: inquiryId.match(/^[0-9a-fA-F]{24}$/) ? inquiryId : null }, { id: inquiryId }] },
        { 
          status: 'quoted', 
          quoteAmount: total, 
          quoteDetails: `Quote #${quoteId} generated by ${req.user.name} for LKR ${total.toLocaleString()}` 
        }
      );
    }

    res.json({
      success: true,
      message: 'Quotation generated successfully',
      data: quoteData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate quotation.' });
  }
});

// 4. Products Management
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: 'ERP solution added to catalog',
      data: product
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({
      success: true,
      message: 'Product updated',
      data: updated
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/products/:id', requireRole(['super_admin']), async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({
      $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }]
    });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product deleted from catalog' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Orders Management
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
});

router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { paymentStatus, status, bankSlipNote } = req.body;
    const update = {};
    if (paymentStatus) update.paymentStatus = paymentStatus;
    if (status) update.status = status;
    if (bankSlipNote !== undefined) update.bankSlipNote = bankSlipNote;
    if (paymentStatus === 'completed' || paymentStatus === 'verified') {
      update.paidAt = new Date();
    }

    const order = await Order.findOneAndUpdate(
      { $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { orderId: req.params.id }] },
      { $set: update },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
