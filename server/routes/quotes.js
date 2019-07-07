const express = require("express");

const QuotesController = require('../controllers/quotes.controller')
const router = express.Router();


router.get("/", QuotesController.quotes_get_all);

module.exports = router;
