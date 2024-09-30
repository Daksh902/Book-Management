const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/books');
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');

const app = express();
const cors = require('cors'); // Moved this below
app.use(cors()); // Enable CORS

app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use('/api', bookRoutes);
app.use('/api', transactionRoutes);
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
