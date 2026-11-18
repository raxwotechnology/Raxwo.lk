const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const { verifyToken, JWT_SECRET } = require('../middleware/auth');
const { inMemoryUsers, addUser, findUserByEmail, saveStore } = require('../store');

// Brute-force protection on login (generous limit for development/testing)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: { success: false, message: 'Too many authentication attempts. Please try again after a few minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

function isDBConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// Seed default users if none exist in MongoDB
async function seedDefaultUsers() {
  if (!isDBConnected()) return;
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
      console.log('[Auth] Seeded initial demo users into MongoDB (admin@raxwo.lk, sales@raxwo.lk, buyer@raxwo.lk)');
    }
  } catch (err) {
    console.warn('[Auth] Notice: Could not seed users into MongoDB:', err.message);
  }
}

// User Registration (defaults to 'buyer')
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if account already exists in persistent store
    const memExisting = findUserByEmail(normalizedEmail);
    if (memExisting) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // 1. If MongoDB is connected, attempt MongoDB registration
    if (isDBConnected()) {
      try {
        const existing = await User.findOne({ email: normalizedEmail }).maxTimeMS(2000);
        if (existing) {
          return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
        }

        const user = new User({
          name: name.trim(),
          email: normalizedEmail,
          password,
          phone,
          company,
          role: 'buyer'
        });

        await user.save();

        // Also persist in local store so it survives MongoDB disconnections
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        addUser({
          id: user._id.toString(),
          _id: user._id.toString(),
          name: user.name,
          email: normalizedEmail,
          password: hashedPassword,
          phone,
          company: company || 'Client Account',
          role: 'buyer'
        });

        const token = jwt.sign(
          { id: user._id.toString(), role: user.role, email: user.email, name: user.name },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        return res.status(201).json({
          success: true,
          message: 'Account registered successfully',
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            company: user.company
          }
        });
      } catch (dbErr) {
        console.warn('[Auth DB Register Warning]:', dbErr.message);
      }
    }

    // 2. Persistent Disk/Store Fallback Registration
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserId = `usr_${Date.now()}`;

    const newUser = {
      id: newUserId,
      _id: newUserId,
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone || '',
      company: company || 'Client Account',
      role: 'buyer'
    };

    // Save to persistent file on disk
    addUser(newUser);

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company
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

    const normalizedEmail = email.toLowerCase().trim();

    // 1. If MongoDB is connected, attempt DB lookup
    if (isDBConnected()) {
      try {
        const user = await User.findOne({ email: normalizedEmail }).maxTimeMS(2000);
        if (user) {
          const isMatch = await user.comparePassword(password);
          if (isMatch) {
            const token = jwt.sign(
              { id: user._id.toString(), role: user.role, email: user.email, name: user.name },
              JWT_SECRET,
              { expiresIn: '7d' }
            );

            return res.json({
              success: true,
              message: 'Login successful',
              token,
              user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                company: user.company
              }
            });
          } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
          }
        }
      } catch (dbErr) {
        console.warn('[Auth DB Login Warning]:', dbErr.message);
      }
    }

    // 2. Persistent Store Lookup (Immediate & Reliable)
    const memUser = findUserByEmail(normalizedEmail);
    if (!memUser) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, memUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: memUser.id || memUser._id, role: memUser.role, email: memUser.email, name: memUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: memUser.id || memUser._id,
        name: memUser.name,
        email: memUser.email,
        role: memUser.role,
        company: memUser.company
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
    if (isDBConnected()) {
      try {
        const user = await User.findById(req.user.id).select('-password').maxTimeMS(2000);
        if (user) {
          return res.json({
            success: true,
            user
          });
        }
      } catch (e) {}
    }

    const memUser = inMemoryUsers.find(u => u.id === req.user.id || u._id === req.user.id || u.email === req.user.email);
    if (memUser) {
      const { password, ...safeUser } = memUser;
      return res.json({
        success: true,
        user: safeUser
      });
    }

    res.status(404).json({ success: false, message: 'User not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch user profile.' });
  }
});

module.exports = { router, seedDefaultUsers };
