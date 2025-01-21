const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

// Register user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists.' });

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = generateToken({ id: newUser._id });
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = generateToken({ id: user._id });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.' });
    }
};
