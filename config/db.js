const mongoose = require('mongoose');
require('dotenv').config(); 

// MongoDB connection URI
const uri = process.env.MONGODB_URI;

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
