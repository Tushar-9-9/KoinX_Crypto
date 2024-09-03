const mongoose = require('mongoose');

// Ethereum Price Schema
const ethPriceSchema = new mongoose.Schema({
    price: Number,
    currency: String,
    date: { type: Date, default: Date.now }
});

// Create Model
const EthPrice = mongoose.model('EthPrice', ethPriceSchema);

module.exports = { EthPrice };
