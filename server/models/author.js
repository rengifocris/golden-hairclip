const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorName: { type: String, require: false },
});

module.exports = mongoose.model('Author', commentSchema);
