const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');
const priceRoutes = require('./routes/priceRoutes');
const { startCronJobs } = require('./utils/cronJob');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/prices', priceRoutes);

// Start cron jobs
startCronJobs();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
