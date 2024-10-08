const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

const passportConfig = require('./config/passport');

dotenv.config();

const app = express();
// Middleware
passportConfig(passport);

app.use(express.json());
app.use('/upload', express.static('upload'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));





