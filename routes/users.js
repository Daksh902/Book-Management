const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
    const { name, email, phoneNumber } = req.body;
    try {
        const newUser = new User({ name, email, phoneNumber });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
