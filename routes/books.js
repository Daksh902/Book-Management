const express = require('express');
const Book = require('../models/book');
const router = express.Router();

// Get all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Query by book name or term
router.get('/books/search', async (req, res) => {
    const { term } = req.query;
    try {
        const books = await Book.find({ name: new RegExp(term, 'i') });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Query by rent price range
router.get('/books/rent-range', async (req, res) => {
    const { minRent, maxRent } = req.query;
    try {
        const books = await Book.find({
            rentPerDay: { $gte: parseInt(minRent), $lte: parseInt(maxRent) }
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Query by category + term + rent range
router.get('/books/advanced-search', async (req, res) => {
    const { category, term, minRent, maxRent } = req.query;
    try {
        const books = await Book.find({
            category,
            name: new RegExp(term, 'i'),
            rentPerDay: { $gte: parseInt(minRent), $lte: parseInt(maxRent) }
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

module.exports = router;
