const express = require("express");

const QuotesController = require('../controllers/quotes.controller')
const router = express.Router();


router.get("/", QuotesController.quotes_get_all);
router.put("/", function(req, res){QuotesController.update_quotes});

module.exports = router;
