const express = require('express');
const { fetchTransactions } = require('./controllers');
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

module.exports = router;
