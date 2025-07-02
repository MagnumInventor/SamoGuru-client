const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['waiter', 'helper', 'admin'], default: 'waiter' },
});

module.exports = mongoose.model('User', UserSchema);
