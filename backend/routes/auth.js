const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const InvitationToken = require('../models/InvitationToken');
const AdminInvitation = require('../models/AdminInvitation');
const { generateJWT, hashPassword, comparePassword, validateToken } = require('../services/authServices');
const router = express.Router();


// TEST ROUTE
router.get('/test', (req, res) => res.send('API is working!'));


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