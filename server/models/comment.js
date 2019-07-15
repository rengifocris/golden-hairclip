const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
    comment: { type: String, require: false },
    date: { type: Date, require: false },
});

module.exports = mongoose.model('Comment', commentSchema);