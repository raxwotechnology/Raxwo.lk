const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { verifyToken, JWT_SECRET } = require('../middleware/auth');

// Brute-force protection on login
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many authentication attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Seed default users if none exist
async function seedDefaultUsers() {
  try {
    const adminCount = await User.countDocuments({ role: 'super_admin' });
    if (adminCount === 0) {
      await User.create([
        {
          name: 'Super Administrator',
          email: 'admin@raxwo.lk',
          password: 'Admin@12345',
          role: 'super_admin',
          company: 'Raxwo Next Level Tech'
        },
        {
          name: 'Sales Manager',
          email: 'sales@raxwo.lk',
          password: 'Sales@12345',
          role: 'sales_admin',
          company: 'Raxwo Enterprise Sales'
        },
        {
          name: 'Sample Buyer',
          email: 'buyer@raxwo.lk',
          password: 'Buyer@12345',
          role: 'buyer',
          company: 'Lanka Retail Mart'
        }
      ]);
      console.log('[Auth] Seeded initial demo users (admin@raxwo.lk, sales@raxwo.lk, buyer@raxwo.lk)');
    }
  } catch (err) {
    console.error('[Auth] Error seeding users:', err.message);
  }
}

// User Registration (defaults to 'buyer')
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      company,
      role: 'buyer'
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      }
    });
  } catch (err) {
    console.error('[Auth Register Error]:', err);
    res.status(500).json({ success: false, message: 'Registration failed due to server error.' });
  }
});

// User Login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company
      }
    });
  } catch (err) {
    console.error('[Auth Login Error]:', err);
    res.status(500).json({ success: false, message: 'Login failed due to server error.' });
  }
});

// Get Current User Profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    res.json({
      success: true,
      user
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user profile.' });
  }
});

module.exports = { router, seedDefaultUsers };
