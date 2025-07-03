const express = require('express');
const User = require('../models/User');
const InvitationToken = require('../models/InvitationToken');
const bcrypt = require('bcryptjs');


const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') return res.sendStatus(403);
  next();
};

// POST /api/auth/register-employee
router.post('/register-employee', async (req, res) => {
  try {
    const { firstName, lastName, email, password, token, phone, role } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // For waiter/helper, validate token
    if (role !== "trainee") {
      const invitation = await InvitationToken.findOne({ token, isUsed: false });
      if (!invitation) {
        return res.status(400).json({ message: "Invalid or used token" });
      }
      invitation.isUsed = true;
      invitation.usedAt = new Date();
      await invitation.save();
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      role,
      phone,
      invitationToken: token,
      profile: {
        name: `${firstName} ${lastName}`,
        position: role,
        department: ""
      }
    });
    await user.save();

    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;