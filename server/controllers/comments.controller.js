const mongoose = require("mongoose");
const Comment = require("../models/comment");
const Quote = require("../models/quote");

/**
 * Function to get all the comments
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const comments_get_all = async (req, res, next) => {

    try {
        let comments = await Comment.find().exec();
        console.log(comments);
        res.status(200).json(comments);
    } catch (e) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }

};

/**
 * Function to get all the comments by quote
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const comments_get_by_quote = async (req, res, next) => {

    const quote = { 'quote': req.params.quote };

    try {
        let comments = await Comment.find(quote).exec();
        console.log(comments);
        res.status(200).json(comments);
    } catch (e) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }

};

/**
 * Function to save the comments by quote
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const comments_save_by_quote = async (req, res, next) => {

    const quoteId = req.body.quoteId;

    try {
        let quote = await Quote.findById(quoteId).exec();
        if (quote) {
            let comment = new Comment({
                _id: mongoose.Types.ObjectId(),
                quote: quoteId,
                comment: req.body.comment,
                date: new Date(),
            });

            let createdComment = comment.save();
            res.status(200).json(createdComment);
        } else {
            res.status(404).json({
                message: 'There is not any quote with the Id provided'
            });
        }
    } catch (e) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }

};

module.exports = {
    comments_get_all,
    comments_get_by_quote,
    comments_save_by_quote
};