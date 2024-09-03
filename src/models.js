const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    blockNumber: String,
    timeStamp: String,
    hash: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    isError: String,
    txreceipt_status: String,
    input: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    gasUsed: String,
    confirmations: String,
});

// Ethereum Price Schema
const ethPriceSchema = new mongoose.Schema({
    price: Number,
    currency: String,
    date: { type: Date, default: Date.now }
});

// Create Models
const Transaction = mongoose.model('Transaction', transactionSchema);
const EthPrice = mongoose.model('EthPrice', ethPriceSchema);

module.exports = { Transaction, EthPrice };
