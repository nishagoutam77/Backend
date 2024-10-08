const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body); 

  try {
    // if (!name || !username || !email || !password) {
    //   return res.status(400).json({ message: 'All fields are required' });
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //const user = await User.create({ name, username, email, password });
    const newUser = new User({ name, email, password });
    await newUser.save();
    const token = generateToken(newUser);

    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Google OAuth callback
exports.googleAuthCallback = (req, res) => {
  const token = generateToken(req.user);
  res.redirect(`/dashboard?token=${token}`);
};
