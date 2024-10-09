const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const fileController = require('../controllers/fileController');

router.post('/upload', upload.single('file'), fileController.uploadFile);

router.get('/download/:filename', fileController.downloadFile);

module.exports = router;
