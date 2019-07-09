const mongoose = require("mongoose");
const Quote = require("../models/quote");
const DailyQuote = require("../models/daily-quote");

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

const quotes_get_daily_quote = async (req, res, next) => {
  try {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let dailyQuote = await DailyQuote.findOne({'validDate': date}).exec();
     console.log(dailyQuote);
    res.status(200).json(dailyQuote);
  } catch (e) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const update_quotes = async (req, res, next) => {
  try {
    console.log(req);
    //Create daily quote for today date
   quote = new Quote({
       _id: new mongoose.Types.ObjectId(),
       quoteId: req.body._id,
       author: req.body.author,
       to: req.body.to,
       quote: req.body.quote,
       date: req.body.date
   });
   quote.save(function(err, result) {
       if (err) {
           console.log(err);
       } else {
           console.log(result);
           res.status(200).json(dailyQuote);
       }
   });
  } catch (e) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};

const quotes_test = () => {
  return null;
}

module.exports = {
  quotes_get_all,
  quotes_get_daily_quote,
  quotes_test
};
