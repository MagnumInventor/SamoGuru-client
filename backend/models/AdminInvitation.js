const mongoose = require('mongoose');

const AdminInvitationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true },
  isUsed: { type: Boolean, default: false },
  adminLevel: { type: String, required: true }
});

module.exports = mongoose.model('AdminInvitation', AdminInvitationSchema);