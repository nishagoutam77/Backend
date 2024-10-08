const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const { generateToken } = require('../controllers/authController');
require('dotenv').config();

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ email: profile.emails[0].value });

          if (existingUser) {
            //const token = generateToken(existingUser);
            return done(null, { user: existingUser });
          }

          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });

          await newUser.save();
          //const token = generateToken(newUser);
          done(null, { user: newUser });
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
};