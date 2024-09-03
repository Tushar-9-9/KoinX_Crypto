const express = require('express');
const { fetchEthereumPrice, getExpensesAndPrice } = require('../controllers/priceController');
const router = express.Router();

router.get('/eth-price', async (req, res) => {
    try {
        const price = await fetchEthereumPrice();
        res.json({ price });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/expenses-and-price/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const result = await getExpensesAndPrice(address);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
