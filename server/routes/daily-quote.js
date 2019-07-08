const express = require("express");

const QuotesController = require('../controllers/quotes.controller')
const router = express.Router();


router.get("/", QuotesController.quotes_get_daily_quote);

module.exports = router;
