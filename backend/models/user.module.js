//backend/models/auth.model.js
import mongoose from "mongoose";

export const USER_ROLES = {
  TRAINEE: 'trainee',
  HELPER: 'helper',
  WAITER: 'waiter',
  ADMIN: 'admin'
};

const userSchema = new mongoose.Schema({
  email: {
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
    role: {
    type: String,
    enum: Object.values(USER_ROLES), // Обмежуємо можливі значення
    default: USER_ROLES.TRAINEE,     // Стажер за замовчуванням
    required: true
  },
  entryDate: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  },
 resetPasswordToken: String,
 resetPasswordExpiresAt: Date,
 verificationToken: String,
 verificationTokenExpiresAt: Date,
},{timestamps: true});

export const User = mongoose.model('User', userSchema);