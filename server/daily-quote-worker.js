
const mongoose = require('mongoose');
const dbConfig = require('./utils/db-config');
const DailyQuote = require('./models/daily-quote');
const Quote = require('./models/quote');
// Initialize Object
var workers = {};
//Funciton to valdiate if there is a daily quote for todays date and if not set one
workers.setDailyQuote =  async () => {
    try {
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let dailyQuote = await DailyQuote.findOne({'validDate': date}).exec();
      console.log(dailyQuote);
      //If there is not quote for today then get a random one
      if(!dailyQuote)
      {
         //Get the count of all users
         Quote.countDocuments().exec(function (err, count) {
           // Get a random entry
           var random = Math.floor(Math.random() * count)
           // Again query all users but only fetch one offset by our random #
           Quote.findOne().skip(random).exec(
             function (err, result) {
               if(!err ){
                 //Tada! random QUOTE
                 console.log("Found Random Quote: " + result);
                //Create daily quote for today date
                 quote = new DailyQuote({
                     _id: new mongoose.Types.ObjectId(),
                     quoteId: result._id,
                     author: result.author,
                     to: result.to,
                     quote: result.quote,
                     date: result.date,
                     validDate: date
                 });
                 quote.save(function(err, result) {
                     if (err) {
                         console.log(err);
                     } else {
                         console.log(result);
                     }
                 });

               } else{
                 console.log("Error: Reading the quotes: " + err);
               }
             })
         })
      }
      else{
        console.log("Warning: Daily Quote Already Exist:" + dailyQuote);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // Wroker to loop all the checks every minute
  workers.loop = function(){
    setInterval(function(){
        workers.setDailyQuote();
    }, 1 * 24 * 60 * 60 * 1000); // days * 24 * 60 * 60 * 1000
  };

  //Init function
  workers.init = function(){
    //Execute all the checks
    workers.setDailyQuote();
    //Call a loop to all the check continue being executed
    workers.loop();
  };

  //Export module callback
  module.exports= workers;
