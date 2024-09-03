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

// Create Model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };
