// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const rateLimit = require('express-rate-limit');

// const router = express.Router();

// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5,
//     message: 'Too many login attempts from this IP, please try again later.'
// });

// router.post('/register', async (req, res) => {
//     const { studentID, email, password, confirmPassword } = req.body;

//     if (!studentID || !email || !password || !confirmPassword) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     if (password.length < 8) {
//         return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
//     }

//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     try {
//         const existingUser = await User.findOne({ studentID });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Student ID already exists.' });
//         }

//         const newUser = new User({ studentID, email, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error, please try again later.' });
//     }
// });

// router.post('/login', loginLimiter, async (req, res) => {
//     const { studentID, password } = req.body;

//     if (!studentID || !password) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//         const user = await User.findOne({ studentID });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid Student ID or Password.' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid Student ID or Password.' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.cookie('auth-token', token, { httpOnly: true }).status(200).json({ message: 'Login successful.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error, please try again later.' });
//     }
// });

// router.get('/logout', (req, res) => {
//     res.clearCookie('auth-token');  // Clear the auth token cookie
//     res.json({ message: 'Logged out successfully.' });  // Send a response to the client
// });

// module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: 'Too many login attempts from this IP, please try again later.'
});

router.post('/register', async (req, res) => {
    const { studentID, email, password, confirmPassword } = req.body;

    if (!studentID || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        const existingUser = await User.findOne({ studentID });
        if (existingUser) {
            return res.status(400).json({ message: 'Student ID already exists.' });
        }

        const newUser = new User({ studentID, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

router.post('/login', loginLimiter, async (req, res) => {
    const { studentID, password } = req.body;

    if (!studentID || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const user = await User.findOne({ studentID });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Student ID or Password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Student ID or Password.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('auth-token', token, { httpOnly: true }).status(200).json({ message: 'Login successful.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth-token'); // Clear the authentication token cookie
    res.status(200).send('Logged out successfully');
});


module.exports = router;
