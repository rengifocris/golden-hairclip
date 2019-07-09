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
   const quote = new Quote({
       _id: new mongoose.Types.ObjectId(),
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
           res.status(200).json(quote);
       }
   });
  } catch (e) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
};
const delete_quotes = (req,res, next) => {
  const id=req.query.id;
  console.log(req.query.id);
  if(mongoose.Types.ObjectId.isValid(id)) {
    Quote.remove({_id: id})
      .then((docs)=>{
        if(docs) {
          return res.status(200).send({"success":true,data:docs});
        } else {
          res.status(200).send({"success":false,data:"no such user exist"});
        }
    }).catch((err)=>{
       reject(err);
    })
  }else {
    res.status(200).send({"success":false,data:"please provide correct Id"});
  }
};
const delete_quotes2 = (req,res, next) => {
  Quote.findByIdAndRemove(req.params.id, (err, tasks) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "Todo successfully deleted",
        id: req.params.id
    };
    return res.status(200).send(response);
  });
};
const quotes_test = (req,res, next) => {
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
  quotes_test
};
