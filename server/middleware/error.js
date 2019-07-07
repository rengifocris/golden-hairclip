

/**
 * Handling internal fatal error generally
 * @param {*} error - error object
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - fuction next to continue 
 */
const getFatalError = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
}

/**
 *  Handling http not found generally
 */
const getNotFoundError = () => {
    const error = new Error("Not found");
    error.status = 404;
    return error;
}

module.exports = {
    getFatalError,
    getNotFoundError
}