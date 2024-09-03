const { fetchEthereumPrice } = require('../controllers/priceController');
const cron = require('node-cron');

const startCronJobs = () => {
    // Schedule a cron job to fetch Ethereum price every 10 minutes
    cron.schedule('*/10 * * * *', async () => {
        try {
            const ethPrice = await fetchEthereumPrice();
            console.log(`Ethereum price updated: ${ethPrice} INR`);
        } catch (error) {
            console.error('Error fetching Ethereum price:', error);
        }
    });
};

module.exports = { startCronJobs };
