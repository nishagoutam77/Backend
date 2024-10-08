const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({ user, token });
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
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Google OAuth callback
// exports.googleAuthCallback = (req, res) => {
//   const token = generateToken(req.user);
//   res.redirect(`/dashboard?token=${token}`);
// };



// const User = require('../models/userModel');

// exports.getDummyData = (req, res) => {

// const dummyData = {age:[20, 22, 25, 27, 30, 32, 35, 36, 37, 40],
//             gender:['Male', 'Female', 'Other'],
// profession:['Engineer', 'Doctor', 'Artist', 'Teacher', 'Scientist','Business', 'Singer']};
    
// res.status(200).json(dummyData);
// };


// exports.createUser = async (req, res) => {
//     try {
//         const { firstName, lastName, age, gender, profession } = req.body;
        
//         const user = new User({firstName,lastName,age,gender,profession});
//         const savedUser = await user.save();
//         res.status(201).json(savedUser);
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating user', error });
//     }
// };

// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users', error });
//     }
// };