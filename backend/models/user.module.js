//backend/controllers/auth.controller.js
import mongoose from "mongoose";


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