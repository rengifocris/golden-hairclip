const express = require("express");

const AuthorsController = require('../controllers/authors.controller')
const router = express.Router();


router.get("/", AuthorsController.authors_get_all);

module.exports = router;
