const mongoose = require("mongoose");
const Quote = require("../models/quote");
const DailyQuote = require("../models/daily-quote");

/**
 * Function to get all the quotes
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const quotes_get_all = async (req, res, next) => {

  try {
    let quotes = await Quote.find().exec();
    console.log(quotes);
    res.status(200).json(quotes);
  } catch (e) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }

};

const quotes_get_all_filtered = async (req, res, next) => {

  try {
    let quotes = await Quote.find().exec();
    console.log(quotes);
    res.status(200).json(quotes);
  } catch (e) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }

};

/**
 * Function to get the quotes paginated, it is necesary the page and the limit into the request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const quotes_get_paginated = async (req, res, next) => {

  let page = parseInt(req.params.page) || 0; //for next page pass 1 here
  let limit = parseInt(req.params.limit) || 10;
  let toSkip = (page - 1) * limit;
  try {
    let allQuotes = await Quote.find().exec();
    let quotes = await Quote.find().skip(toSkip).limit(limit).exec();

    console.log(quotes);
    res.status(200).json({
      data: quotes,
      limit: limit,
      page: page,
      paginationSize: quotes.length,
      totalPages: allQuotes.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const quotes_get_slice = async (req, res, next) => {

  console.log(req.params);
  let toSkip = parseInt(req.params.current) || 0; //for next page pass 1 here
  let limit = parseInt(req.params.limit) || 10;
  try {
    let allQuotes = await Quote.find().exec();
    let quotes = await Quote.find().skip(toSkip).limit(limit).exec();

    // console.log(quotes);
    res.status(200).json({
      data: quotes,
      limit: limit,
      current: toSkip,
      sliceSize: quotes.length,
      totalItems: allQuotes.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const quotes_get_by_id = async (req, res, next) => {
  try {
    const id = req.params.quoteId;
    console.log(id);
    if (mongoose.Types.ObjectId.isValid(id)) {
      let selectedQuote = await Quote.findOne({ '_id' : id }).exec();
      console.log(selectedQuote);
      res.status(200).json(selectedQuote);
    }
    else {
      res.status(200).send({ "success": false, data: "please provide correct Id" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
};

const quotes_get_daily_quote = async (req, res, next) => {

  try {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let dailyQuote = await DailyQuote.findOne({ 'validDate': date }).exec();
    console.log(dailyQuote);
    res.status(200).json(dailyQuote);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
};

const update_quotes = async (req, res, next) => {

  try {
    console.log(req);
    //Create daily quote for today date
    const quote = new Quote({
      _id: new mongoose.Types.ObjectId(),
      author: req.body.author,
      to: req.body.to,
      quote: req.body.quote,
      date: req.body.date
    });

    let newQuote = await quote.save();
    res.status(200).json(newQuote);

  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
};

const delete_quotes = (req, res, next) => {
  const id = req.query.id;
  console.log(req.query.id);
  if (mongoose.Types.ObjectId.isValid(id)) {
    Quote.remove({ _id: id })
      .then((docs) => {
        if (docs) {
          return res.status(200).send({ "success": true, data: docs });
        } else {
          res.status(200).send({ "success": false, data: "no such user exist" });
        }
      }).catch((err) => {
        reject(err);
      })
  } else {
    res.status(200).send({ "success": false, data: "please provide correct Id" });
  }
};

const delete_quotes2 = (req, res, next) => {
  Quote.findByIdAndRemove(req.params.id, (err, tasks) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Todo successfully deleted",
      id: req.params.id
    };
    return res.status(200).send(response);
  });
};

const quotes_test = (req, res, next) => {
  console.log("err");
  res.status(200).json({
    error: "None"
  });
}

module.exports = {
  quotes_get_all,
  quotes_get_daily_quote,
  update_quotes,
  delete_quotes,
  quotes_get_paginated,
  quotes_get_slice,
  quotes_test,
  quotes_get_by_id
};
