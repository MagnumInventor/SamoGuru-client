const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const InvitationToken = require('../models/InvitationToken');
const AdminInvitation = require('../models/AdminInvitation');
const { generateUniqueToken } = require('../services/authService');
const { sendAdminInvitation } = require('../services/emailService');
const router = express.Router();

// POST /api/admin/create-invitation-token
router.post('/create-invitation-token', authenticateToken, requireAdmin, async (req, res) => {
  const { employeeRole, employeeData } = req.body;
  if (!employeeRole || !employeeData) return res.status(400).json({ message: "Всі поля обовʼязкові" });

  const token = await generateUniqueToken();
  const invitation = new InvitationToken({
    token,
    isUsed: false,
    createdBy: req.user.id,
    employeeRole,
    employeeData
  });
  await invitation.save();
  res.status(201).json({ token });
});

// GET /api/admin/invitation-tokens
router.get('/invitation-tokens', authenticateToken, requireAdmin, async (req, res) => {
  const tokens = await InvitationToken.find().populate('createdBy', 'email');
  res.json(tokens);
});

// POST /api/admin/invite-admin
router.post('/invite-admin', authenticateToken, requireAdmin, async (req, res) => {
  const { email, adminLevel } = req.body;
  if (!email || !adminLevel) return res.status(400).json({ message: "Всі поля обовʼязкові" });

  const token = Math.random().toString(36).substring(2, 10);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  const invitation = new AdminInvitation({
    email,
    token,
    createdBy: req.user.id,
    expiresAt,
    isUsed: false,
    adminLevel
  });
  await invitation.save();

  await sendAdminInvitation(email, token);

  res.status(201).json({ message: "Запрошення надіслано", token });
});

module.exports = router;