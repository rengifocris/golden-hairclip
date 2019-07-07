const mongoose = require("mongoose");
const Quote = require("../models/quote");

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

const quotes_test = () => {
  return null;
}

module.exports = {
  quotes_get_all, 
  quotes_test
};