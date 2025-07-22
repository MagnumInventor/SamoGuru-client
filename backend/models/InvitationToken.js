const mongoose = require('mongoose');

const InvitationTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true }, // 5-digit
  isUsed: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  usedAt: { type: Date },
  employeeRole: { type: String, required: true },
  employeeData: {
    name: String,
    position: String,
    department: String
  }
});

module.exports = mongoose.model('InvitationToken', InvitationTokenSchema);