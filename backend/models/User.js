const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: { type: String, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Невірний формат електронної пошти'],
  },
  password: String,
  role: { type: String, enum: ['waiter', 'helper', 'admin'], default: 'waiter' },
});

module.exports = mongoose.model('User', UserSchema);
