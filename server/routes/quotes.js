const express = require("express");


const QuotesController = require('../controllers/quotes.controller')
const router = express.Router();

router.get("/", QuotesController.quotes_get_all);
router.post("/", QuotesController.update_quotes);
router.delete("/", QuotesController.delete_quotes);


module.exports = router;
