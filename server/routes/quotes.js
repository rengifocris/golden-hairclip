const express = require("express");


const QuotesController = require('../controllers/quotes.controller')
const router = express.Router();

// get all the data 
router.get("/", QuotesController.quotes_get_all);

// get data paginated
router.get("/:page/:limit", QuotesController.quotes_get_paginated);

// register a quote
router.post("/", QuotesController.update_quotes);

// delete a quote
router.delete("/", QuotesController.delete_quotes);

module.exports = router;
