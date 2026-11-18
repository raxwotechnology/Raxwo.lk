const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');
const Order = require('../models/Order');
const User = require('../models/User');
const { verifyToken, requireRole } = require('../middleware/auth');
const { inMemoryOrders, inMemoryInquiries, saveStore } = require('../store');

function isDBConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// All admin routes require authentication and either 'super_admin' or 'sales_admin' role
router.use(verifyToken);
router.use(requireRole(['super_admin', 'sales_admin']));

// 1. Platform Analytics
router.get('/analytics', async (req, res) => {
  try {
    let totalProducts = 12;
    let inquiries = inMemoryInquiries;
    let orders = inMemoryOrders;
    let usersCount = 3;

    if (isDBConnected()) {
      try {
        const [dbProductsCount, dbInquiries, dbOrders, dbUsersCount] = await Promise.all([
          Product.countDocuments(),
          Inquiry.find().lean(),
          Order.find().lean(),
          User.countDocuments()
        ]);
        if (dbProductsCount) totalProducts = dbProductsCount;
        if (dbInquiries && dbInquiries.length > 0) inquiries = dbInquiries;
        if (dbOrders && dbOrders.length > 0) {
          const dbIds = new Set(dbOrders.map(o => o.orderId));
          const unsaved = inMemoryOrders.filter(o => !dbIds.has(o.orderId));
          orders = [...unsaved, ...dbOrders];
        }
        if (dbUsersCount) usersCount = dbUsersCount;
      } catch (e) {
        console.warn('[Admin Analytics DB Warning]:', e.message);
      }
    }

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

    if (isDBConnected()) {
      try {
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
        if (inquiries && inquiries.length > 0) {
          const dbIds = new Set(inquiries.map(i => i.id));
          const unsaved = inMemoryInquiries.filter(i => !dbIds.has(i.id));
          const merged = [...unsaved, ...inquiries];
          return res.json({
            success: true,
            count: merged.length,
            data: merged
          });
        }
      } catch (e) {
        console.warn('[Admin Inquiries DB Warning]:', e.message);
      }
    }

    // In-memory filter fallback
    let list = inMemoryInquiries;
    if (status && status !== 'all') {
      list = list.filter(i => i.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i => 
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.phone && i.phone.includes(q)) ||
        (i.email && i.email.toLowerCase().includes(q)) ||
        (i.preferredErp && i.preferredErp.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    res.json({
      success: true,
      count: inMemoryInquiries.length,
      data: inMemoryInquiries
    });
  }
});

router.patch('/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, assignedTo, quoteAmount, quoteDetails } = req.body;
    const updates = {
      ...(status && { status }),
      ...(notes !== undefined && { notes }),
      ...(assignedTo && { assignedTo }),
      ...(quoteAmount !== undefined && { quoteAmount }),
      ...(quoteDetails !== undefined && { quoteDetails })
    };

    let updated = null;

    if (isDBConnected()) {
      try {
        updated = await Inquiry.findOneAndUpdate(
          { $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { id: id }] },
          { $set: updates },
          { new: true }
        );
      } catch (e) {}
    }

    // Update in-memory inquiry
    const memInq = inMemoryInquiries.find(i => i.id === id || i._id === id);
    if (memInq) {
      Object.assign(memInq, updates);
      saveStore();
      if (!updated) updated = memInq;
    }

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
      const quoteDetails = `Quote #${quoteId} generated by ${req.user.name} for LKR ${total.toLocaleString()}`;
      if (isDBConnected()) {
        try {
          await Inquiry.findOneAndUpdate(
            { $or: [{ _id: inquiryId.match(/^[0-9a-fA-F]{24}$/) ? inquiryId : null }, { id: inquiryId }] },
            { 
              status: 'quoted', 
              quoteAmount: total, 
              quoteDetails 
            }
          );
        } catch (e) {}
      }

      const memInq = inMemoryInquiries.find(i => i.id === inquiryId || i._id === inquiryId);
      if (memInq) {
        memInq.status = 'quoted';
        memInq.quoteAmount = total;
        memInq.quoteDetails = quoteDetails;
      }
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
router.post('/products', requireRole(['super_admin']), async (req, res) => {
  try {
    const product = new Product(req.body);
    if (isDBConnected()) {
      await product.save();
    }
    res.status(201).json({
      success: true,
      message: 'ERP solution added to catalog',
      data: product
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/products/:id', requireRole(['super_admin']), async (req, res) => {
  try {
    let updated = null;
    if (isDBConnected()) {
      updated = await Product.findOneAndUpdate(
        { $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] },
        { $set: req.body },
        { new: true }
      );
    }
    res.json({
      success: true,
      message: 'Product updated',
      data: updated || req.body
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/products/:id', requireRole(['super_admin']), async (req, res) => {
  try {
    if (isDBConnected()) {
      await Product.findOneAndDelete({
        $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }]
      });
    }
    res.json({ success: true, message: 'Product deleted from catalog' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Orders Management (Resilient MongoDB + In-Memory Fallback)
router.get('/orders', async (req, res) => {
  try {
    if (isDBConnected()) {
      try {
        const dbOrders = await Order.find().sort({ createdAt: -1 }).lean();
        if (dbOrders && dbOrders.length > 0) {
          const dbIds = new Set(dbOrders.map(o => o.orderId));
          const unsaved = inMemoryOrders.filter(o => !dbIds.has(o.orderId));
          const merged = [...unsaved, ...dbOrders];
          return res.json({
            success: true,
            count: merged.length,
            data: merged
          });
        }
      } catch (dbErr) {
        console.warn('[Admin Orders DB Warning]:', dbErr.message);
      }
    }

    // In-memory fallback
    res.json({
      success: true,
      count: inMemoryOrders.length,
      data: inMemoryOrders
    });
  } catch (err) {
    res.json({
      success: true,
      count: inMemoryOrders.length,
      data: inMemoryOrders
    });
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

    let updatedOrder = null;

    if (isDBConnected()) {
      try {
        updatedOrder = await Order.findOneAndUpdate(
          { $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { orderId: req.params.id }] },
          { $set: update },
          { new: true }
        );
      } catch (dbErr) {
        console.warn('[Admin Order Status Update Warning]:', dbErr.message);
      }
    }

    // Always update in in-memory store
    const memOrder = inMemoryOrders.find(o => 
      o.orderId === req.params.id || 
      o.id === req.params.id || 
      o._id === req.params.id
    );
    if (memOrder) {
      Object.assign(memOrder, update);
      saveStore();
      if (!updatedOrder) updatedOrder = memOrder;
    }

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: updatedOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
