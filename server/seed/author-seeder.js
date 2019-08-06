const mongoose = require('mongoose');
const dbConfig = require('../utils/db-config');
const Author = require('../models/author');
const quoteData = require('../../authors.json');

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
    author = new Author({
        _id: new mongoose.Types.ObjectId(),
        authorName: element.AuthorName
    });
    author.save(function(err, result) {
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
