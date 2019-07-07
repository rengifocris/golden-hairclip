const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: { type: String, required: false },
    to: { type: String, required: false },
    quote: { type: String, required: false },
    date: { type: String, required: false }
});

module.exports = mongoose.model('Quote', quoteSchema);