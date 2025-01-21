const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Replace with your user model
const authMiddleware = require('../middleware/auth'); // JWT middleware for authentication

// GET /api/user - Fetch authenticated user data
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Find the user by ID (set in the JWT payload by authMiddleware)
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
