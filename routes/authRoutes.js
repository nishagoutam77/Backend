const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, googleAuthCallback } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), 
(req, res) => {
    res.redirect('https://www.creative-tim.com/product/soft-ui-dashboard');
  }
);

module.exports = router;





// const express = require('express');
// const { registerUser, loginUser, deleteUser, forgotPassword,
//      verifyOtp, changePassword} = require('../controllers/authController');
// const router = express.Router();

// // Routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// //router.delete('/delete/:userId', deleteUser);
// router.post('/forgot-password', forgotPassword);
// router.post('/verify-otp', verifyOtp);
// router.post('/change-password', changePassword);

// module.exports = router;
