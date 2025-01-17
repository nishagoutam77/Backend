const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,

  },
  filename: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  filetype: {
    type: String,
    required: true
  },
  filesize: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', fileSchema);
