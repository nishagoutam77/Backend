const path = require('path');
const File = require('../models/fileModel'); 

exports.uploadFile = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email || !req.file) {
    return res.status(400).json({ message: 'Name, Email and file are required!' });
  }

  try {
    const newFile = new File({
      name: name,     
      email: email,           
      filename: req.file.filename,
      filepath: req.file.path,    
      filetype: req.file.mimetype,
      filesize: req.file.size
    });
    
    const savedFile = await newFile.save();

    const fileUrl = `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;

    res.status(200).json({
      message: 'File uploaded successfully!',
      file: savedFile, 
      fileUrl: fileUrl 
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error saving file to the database',
      error: err.message
    });
  }
};


exports.downloadFile = (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, '..', 'upload', filename); 

  res.download(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error downloading file', error: err.message });
    }
  });
};


