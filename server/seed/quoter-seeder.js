const mongoose = require('mongoose');

const Quote = require('../models/quote');
const quoteData = require('../../frases.json');

var data = [];
data = quoteData;

mongoose.connect(
    "mongodb+srv://node-shop:node-shop@cluster0-7ppfr.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        poolSize: 100
    }
);

var done = 0;
data.forEach(function (element) {
    quote = new Quote({
        _id: new mongoose.Types.ObjectId(),
        author: element.author,
        to: element.to,
        quote: element.quote,
        date: element.date
    });
    quote.save(function(err, result) {
        done++;
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        if (done === data.length) {
            exit();
        }
    });
});

function exit() {
    mongoose.disconnect();
}