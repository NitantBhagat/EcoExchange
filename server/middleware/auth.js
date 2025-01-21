const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied.' });

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Token missing or malformed.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add decoded user data to the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired.' });
    }
};

module.exports = protect;
