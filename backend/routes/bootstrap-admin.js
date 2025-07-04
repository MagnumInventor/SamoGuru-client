// Add this to your routes/auth.js (or a separate bootstrap file)
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// POST /api/auth/bootstrap-superadmin
router.post('/bootstrap-superadmin', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if any admin exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(403).json({ message: "Superadmin already exists" });
    }
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      profile: { name: "Superadmin", position: "Superadmin", department: "" }
    });
    await user.save();
    res.status(201).json({ message: "Superadmin created" });
  } catch (err) {
    res.status(500).json({ message: "Error creating superadmin" });
  }
});

module.exports = router;