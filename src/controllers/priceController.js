const axios = require('axios');
const { EthPrice } = require('../models/priceModel');

// Fetch and store Ethereum price
const fetchEthereumPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'ethereum',
                vs_currencies: 'inr'
            }
        });

        const ethPrice = new EthPrice({
            price: response.data.ethereum.inr,
            currency: 'INR'
        });

        await ethPrice.save(); // Save the price to the database

        return ethPrice.price;
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
        throw new Error('Could not fetch Ethereum price');
    }
};

// Get total expenses and Ethereum price
const getExpensesAndPrice = async (address) => {
    try {
        const totalExpenses = await calculateExpenses(address);
        const price = await fetchEthereumPrice();
        return { totalExpenses, price };
    } catch (error) {
        console.error('Error getting expenses and price:', error);
        throw new Error('Could not get expenses and price');
    }
};

module.exports = { fetchEthereumPrice, getExpensesAndPrice };
