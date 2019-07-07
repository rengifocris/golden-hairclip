const constants = require('../utils/constants');

/**
 * Function to allows the access cross origin for al the method request.
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - function next to continue
 */
const allowCrossOrigin = (req, res, next) => {
    res.header(constants.HTTP_HEADER.ACCESS_CONTROL_ALLOW_ORIGIN, constants.HTTP_HEADER.ASTERISK);
    res.header(
      constants.HTTP_HEADER.ACCESS_CONTROL_ALLOW_HEADERS,
      `${constants.HTTP_HEADER.ORIGIN}, ${constants.HTTP_HEADER.X_REQUESTED_WITH}, ${constants.HTTP_HEADER.CONTENT_TYPE}, ${constants.HTTP_HEADER.ACCEPT}, ${constants.HTTP_HEADER.AUTHORIZATION}`
    );
    if (req.method === "OPTIONS") {
      res.header(constants.HTTP_HEADER.ACCESS_CONTROL_ALLOW_METHODS, `${constants.HTTP_HEADER.METHODS.PUT}, ${constants.HTTP_HEADER.HTTP_HEADER.METHODS.POST}, ${constants.HTTP_HEADER.METHODS.PATCH}, ${constants.HTTP_HEADER.METHODS.DELETE}, ${constants.HTTP_HEADER.METHODS.GET}`);
      return res.status(200).json({});
    }
    next();
}

module.exports = allowCrossOrigin;