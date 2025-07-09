const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  phone: { type: String, unique: true, required: true},
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  invitationToken: { type: String }, // 5-digit token used
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  profile: {
    name: String,
    position: String,
    //department: String
  }
});

// NEW V13 export usermodel method
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;

module.exports = mongoose.model('User', UserSchema);
