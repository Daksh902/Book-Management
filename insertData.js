const mongoose = require('mongoose');
const User = require('./models/user');
const Book = require('./models/book');
const Transaction = require('./models/transaction');

// MongoDB connection
mongoose.connect('mongodb+srv://Daksh:Charmi9020@dpcluster.6058cze.mongodb.net/bookManagementDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Sample users
const users = [
    { name: 'John Doe', email: 'john@example.com', phoneNumber: '1234567890' },
    { name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '0987654321' },
    { name: 'Mike Johnson', email: 'mike@example.com', phoneNumber: '1231231234' },
    { name: 'Anna Williams', email: 'anna@example.com', phoneNumber: '3213213214' },
    { name: 'Chris Brown', email: 'chris@example.com', phoneNumber: '9879879876' }
];

// Sample books
const books = [
    { name: "The Great Gatsby", category: "Fiction", rentPerDay: 5 },
    { name: "To Kill a Mockingbird", category: "Fiction", rentPerDay: 4 },
    { name: "1984", category: "Dystopian", rentPerDay: 3 },
    { name: "Pride and Prejudice", category: "Romance", rentPerDay: 6 },
    { name: "The Catcher in the Rye", category: "Fiction", rentPerDay: 4 },
    { name: "The Hobbit", category: "Fantasy", rentPerDay: 7 },
    { name: "Brave New World", category: "Dystopian", rentPerDay: 3 },
    { name: "Moby Dick", category: "Adventure", rentPerDay: 5 },
    { name: "War and Peace", category: "Historical", rentPerDay: 8 },
    { name: "Hamlet", category: "Drama", rentPerDay: 4 },
    { name: "The Odyssey", category: "Epic", rentPerDay: 6 },
    { name: "Crime and Punishment", category: "Crime", rentPerDay: 5 },
    { name: "The Brothers Karamazov", category: "Philosophical", rentPerDay: 7 },
    { name: "The Divine Comedy", category: "Epic", rentPerDay: 8 },
    { name: "Frankenstein", category: "Horror", rentPerDay: 3 },
    { name: "The Metamorphosis", category: "Philosophical", rentPerDay: 4 },
    { name: "Don Quixote", category: "Adventure", rentPerDay: 6 },
    { name: "The Road", category: "Post-apocalyptic", rentPerDay: 5 },
    { name: "The Alchemist", category: "Philosophical", rentPerDay: 4 },
    { name: "Harry Potter and the Sorcerer's Stone", category: "Fantasy", rentPerDay: 6 }
];

// Sample transactions (can be adjusted as necessary)
const transactions = [
    { bookId: null, userId: null, issueDate: new Date(), returnDate: null, totalRent: null }, // Dummy entry for structure
    { bookId: null, userId: null, issueDate: new Date(), returnDate: null, totalRent: null }  // Dummy entry for structure
];

// Insert into DB
const insertData = async () => {
    await User.insertMany(users);
    const insertedBooks = await Book.insertMany(books);
    
    // Link books to transactions (update the bookId in transactions)
    transactions[0].bookId = insertedBooks[0]._id; // Example: link first book to first transaction
    transactions[0].userId = (await User.findOne({ name: 'John Doe' }))._id; // Link to user
    transactions[1].bookId = insertedBooks[1]._id; // Example: link second book to second transaction
    transactions[1].userId = (await User.findOne({ name: 'Jane Smith' }))._id; // Link to user
    
    await Transaction.insertMany(transactions);
    
    console.log('Sample data inserted successfully');
    mongoose.connection.close();
};

insertData();
