const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
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
    required: function() {
      return !this.googleId;
    },
  },
  googleId: {
    type: String, unique: true 
  },
});

// Hash password before saving user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('GoogleUser', userSchema);

module.exports = User;






// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     age: { type: Number, required: true },
//     gender: { type: String, required: true },
//     profession: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('userdetails', userSchema);
