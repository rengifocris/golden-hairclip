const mongoose = require('mongoose');
const dbConfig = require('../utils/db-config');
const Quote = require('../models/quote');
const quoteData = require('../../frases.json');

var data = [];
data = quoteData;

let dbConnection = `${dbConfig.connection}://${dbConfig.dbUser}:${dbConfig.dbPassword}@${dbConfig.cluster}/${dbConfig.dbName}?retryWrites=true&w=majority`;
if(dbConfig.runlocal)
{
  dbConnection = `${dbConfig.connection}://${dbConfig.cluster}/${dbConfig.dbName}?retryWrites=true&w=majority`;
}
//Log connection
console.log(dbConnection);
//Connecto to DB
mongoose.connect(
    dbConnection,
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
