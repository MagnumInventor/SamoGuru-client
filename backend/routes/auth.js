const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const InvitationToken = require('../models/InvitationToken');
const AdminInvitation = require('../models/AdminInvitation');
const { generateJWT, hashPassword, comparePassword, validateToken } = require('../services/authService');
const router = express.Router();

// POST /api/auth/validate-token
router.post('/validate-token', async (req, res) => {
  const { token } = req.body;
  if (!token || !/^\d{5}$/.test(token)) return res.status(400).json({ valid: false, message: "Некоректний токен" });
  const found = await InvitationToken.findOne({ token, isUsed: false });
  if (!found) return res.status(404).json({ valid: false, message: "Токен не знайдено або вже використаний" });
  res.json({ valid: true, employeeRole: found.employeeRole, employeeData: found.employeeData });
});

// POST /api/auth/register-employee
router.post('/register-employee', async (req, res) => {
  const { email, password, token, profile } = req.body;
  if (!email || !password || !token || !profile) return res.status(400).json({ message: "Всі поля обовʼязкові" });

  const invitation = await InvitationToken.findOne({ token, isUsed: false });
  if (!invitation) return res.status(400).json({ message: "Токен недійсний або вже використаний" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Користувач з такою поштою вже існує" });

  const hashedPassword = await hashPassword(password);
  const user = new User({
    email,
    password: hashedPassword,
    invitationToken: token,
    role: invitation.employeeRole,
    isActive: true,
    profile
  });
  await user.save();

  invitation.isUsed = true;
  invitation.usedBy = user._id;
  invitation.usedAt = new Date();
  await invitation.save();

  const jwtToken = generateJWT(user);
  res.status(201).json({ token: jwtToken, user: { email: user.email, role: user.role, profile: user.profile } });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Користувача не знайдено" });
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Невірний пароль" });
  const token = generateJWT(user);
  res.json({ token, user: { email: user.email, role: user.role, profile: user.profile } });
});

// POST /api/auth/register-admin
router.post('/register-admin', async (req, res) => {
  const { email, password, token } = req.body;
  const invitation = await AdminInvitation.findOne({ email, token, isUsed: false, expiresAt: { $gt: new Date() } });
  if (!invitation) return res.status(400).json({ message: "Запрошення недійсне або прострочене" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Користувач з такою поштою вже існує" });

  const hashedPassword = await hashPassword(password);
  const user = new User({
    email,
    password: hashedPassword,
    role: "admin",
    isActive: true,
    profile: { name: "", position: "Адміністратор", department: "" }
  });
  await user.save();

  invitation.isUsed = true;
  await invitation.save();

  const jwtToken = generateJWT(user);
  res.status(201).json({ token: jwtToken, user: { email: user.email, role: user.role, profile: user.profile } });
});

module.exports = router;