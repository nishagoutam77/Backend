const path = require('path');
const File = require('../models/fileModel'); // Import the file model

// Handle file upload and save to DB
exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }

  // Save file metadata to the database
  try {
    const newFile = new File({
      filename: req.file.filename,
      filepath: req.file.path,   // Actual file path saved in the server
      filetype: req.file.mimetype,
      filesize: req.file.size
    });
    
    const savedFile = await newFile.save();

    // Construct file URL
    const fileUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;

    res.status(200).json({
      message: 'File uploaded successfully!',
      file: savedFile,  // Send saved file info
      fileUrl: fileUrl
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error saving file to database',
      error: err.message
    });
  }
};
