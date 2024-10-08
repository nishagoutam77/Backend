const express = require('express');
const userController  = require('../controllers/userController');

const router = express.Router();

//Routes
router.get('/dummy-data', userController.getDummyData);
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;  