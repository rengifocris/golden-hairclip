const mongoose = require('mongoose');

const dailyQuoteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quoteId: { type: String, required: false },
    author: { type: String, required: false },
    to: { type: String, required: false },
    quote: { type: String, required: false },
    date: { type: String, required: false },
    validDate: { type: String, required: false }

});

module.exports = mongoose.model('DailyQuote', dailyQuoteSchema);
