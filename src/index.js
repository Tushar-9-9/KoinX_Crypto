const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const { fetchEthereumPrice } = require('./controllers');
const cron = require('node-cron');

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
app.use('/api', routes);

// Schedule a cron job to fetch Ethereum price every 10 minutes
cron.schedule('*/10 * * * *', async () => {
    try {
        const ethPrice = await fetchEthereumPrice();
        console.log(`Ethereum price updated: ${ethPrice.price} INR`);
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
