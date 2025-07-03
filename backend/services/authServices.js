const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const InvitationToken = require('../models/InvitationToken');
const AdminInvitation = require('../models/AdminInvitation');

const SALT_ROUNDS = 12;

exports.generateJWT = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
};

exports.generateUniqueToken = async () => {
  let token;
  let exists = true;
  while (exists) {
    token = Math.floor(10000 + Math.random() * 90000).toString();
    exists = await InvitationToken.findOne({ token, isUsed: false });
  }
  return token;
};

exports.validateToken = async (token) => {
  if (!/^\d{5}$/.test(token)) return false;
  const found = await InvitationToken.findOne({ token, isUsed: false });
  return !!found;
};

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};