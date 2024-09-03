const axios = require('axios');
const { Transaction, EthPrice } = require('./models');

// Fetch and store transactions
const fetchTransactions = async (address) => {
    try {
        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'asc',
                apikey: process.env.ETHERSCAN_API_KEY
            }
        });

        const transactions = response.data.result;

        // Store transactions in the database
        await Transaction.insertMany(transactions);

        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Could not fetch transactions');
    }
};

// Calculate total expenses for a user
const calculateExpenses = async (address) => {
    try {
        const transactions = await Transaction.find({ from: address });
        let totalExpenses = 0;

        transactions.forEach(tx => {
            const gasUsed = parseInt(tx.gasUsed);
            const gasPrice = parseInt(tx.gasPrice);
            const expense = (gasUsed * gasPrice) / 1e18; // Convert to Ether
            totalExpenses += expense;
        });

        return totalExpenses;
    } catch (error) {
        console.error('Error calculating expenses:', error);
        throw new Error('Could not calculate expenses');
    }
};

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

module.exports = { fetchTransactions, calculateExpenses, fetchEthereumPrice, getExpensesAndPrice };