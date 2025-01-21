const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Register new user
router.post('/signup', registerUser);

// Login user
router.post('/login', loginUser);

module.exports = router;
