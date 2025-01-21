const jwt = require('jsonwebtoken');

// Generate a new JWT token
exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d', // Token expiration
    });
};

// Verify a JWT token
exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
