const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { route } = require('../src/app');

router.post('/registerUser', authController.registerUser);

module.exports = router;