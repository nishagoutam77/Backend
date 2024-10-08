// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare the plain password with the hashed one
UserSchema.methods.matchPassword = async function (enteredPassword) {
    console.log("password = ",this.password)
    console.log("enteredPassword = ",enteredPassword)
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
