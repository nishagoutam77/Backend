const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../upload'));  // Upload files to 'API/upload' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File type and size validation
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf|mp4|svg|doc|docx/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  // Allowed MIME types
  const allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml',
    'application/pdf', 'video/mp4', 
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images (JPEG, PNG, SVG), videos (MP4), and documents (PDF, DOC, DOCX) are allowed!'));
  }
};

// Max file size: 5MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB limit
  fileFilter: fileFilter
});

module.exports = upload;





// const multer = require('multer');
// const path = require('path');

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../upload'));  // Upload files to 'API/upload' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// // File type and size validation
// const fileFilter = (req, file, cb) => {
//   // Allowed file types
//   const allowedTypes = /jpeg|jpg|png|pdf|mp4|svg|doc|docx/;
  
//   // Check file extension and mimetype
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images (JPEG, PNG, SVG), videos (MP4), and documents (PDF, DOC, DOCX) are allowed!'));
//   }
// };

// // Max file size: 5MB
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 },  // 5MB limit
//   fileFilter: fileFilter
// });

// module.exports = upload;
