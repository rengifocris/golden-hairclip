const constants = require('../utils/constants');

/**
 * Function to allows the access cross origin for al the method request.
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} next - function next to continue
 */
const allowCrossOrigin2 = (req, res, next) => {
    res.header(constants.HTTP_HEADER.ACCESS_CONTROL_ALLOW_ORIGIN, constants.HTTP_HEADER.ASTERISK);
    res.header(
      constants.HTTP_HEADER.ACCESS_CONTROL_ALLOW_HEADERS,
      `${constants.HTTP_HEADER.ORIGIN}, ${constants.HTTP_HEADER.X_REQUESTED_WITH}, ${constants.HTTP_HEADER.CONTENT_TYPE}, ${constants.HTTP_HEADER.ACCEPT}, ${constants.HTTP_HEADER.AUTHORIZATION}`
    );
    if (req.method === "OPTIONS") {
      console.log("Me llamo cristian", req)
      res.header(constants.HTTP_HEADER.ACCESS_CONTROL_ALLOW_METHODS, `${constants.HTTP_HEADER.METHODS.PUT}, ${constants.HTTP_HEADER.HTTP_HEADER.METHODS.POST}, ${constants.HTTP_HEADER.METHODS.PATCH}, ${constants.HTTP_HEADER.METHODS.DELETE}, ${constants.HTTP_HEADER.METHODS.GET}`);
      return res.status(200).json({});
    }
    next();
}

const allowCrossOrigin = (req, res, next) =>  {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
};

module.exports = allowCrossOrigin;
