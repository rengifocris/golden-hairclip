const mongoose = require("mongoose");
const Author = require("../models/author");

/**
 * Function to get all the comments
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authors_get_all = async (req, res, next) => {

    try {
        let comments = await Author.find().sort({authorName: 'asc'}).exec();
        console.log(comments);
        res.status(200).json(comments);
    } catch (e) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }

};



module.exports = {
    authors_get_all
};
