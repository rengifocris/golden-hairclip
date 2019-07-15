const express = require("express");

const CommentsController = require('../controllers/comments.controller')
const router = express.Router();


router.post("/", CommentsController.comments_save_by_quote);
router.get("/", CommentsController.comments_get_all);

module.exports = router;
