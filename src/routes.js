const express = require('express');
const { fetchTransactions, calculateExpenses, fetchEthereumPrice } = require('./controllers');
const router = express.Router();

router.get('/transactions/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const transactions = await fetchTransactions(address);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/expenses/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const totalExpenses = await calculateExpenses(address);
        res.json({ totalExpenses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/eth-price', async (req, res) => {
    try {
        const price = await fetchEthereumPrice();
        res.json({ price });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
