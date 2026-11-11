const express = require('express');
const router = express.Router();
const loginUserController = require('../controllers/loginUserController')
const { route } = require('../src/app');

router.post('/loginUser', loginUserController.loginUser);

module.exports = router;