const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorMiddleware = require('./middleware/error');
const crossOriginMiddleware = require('./middleware/cross-origin');
const { ENVIRONMENT } = require('./utils/constants');
const dbConfig = require('./utils/db-config');

const quotesRouter = require('./routes/quotes');
const dailyQuoteRouter = require('./routes/daily-quote');
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
mongoose.Promise = global.Promise;

// creating the express app to expose endpoints
const app = express();

// Logging for development environment
app.use(morgan(ENVIRONMENT.DEV));

// casting the body f the request to Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling Cross Origin
app.use((req, res, next) => {
  crossOriginMiddleware(req, res, next);
});

// Routes which should handle requests
app.use("/quotes", quotesRouter);
app.use("/dailyQuote", dailyQuoteRouter);


//  Handling http not found generally
app.use((req, res, next) => {
  next(errorMiddleware.getNotFoundError());
});


// Handling internal fatal error generally
app.use((error, req, res, next) => {
  errorMiddleware.getFatalError(error, req, res, next);
});

module.exports = app;
