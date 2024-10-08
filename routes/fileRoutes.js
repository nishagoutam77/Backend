const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fileController = require('../controllers/fileController');

// Route to handle file upload
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Route to handle file download
//router.get('/download/:filename', fileController.downloadFile);

module.exports = router;
