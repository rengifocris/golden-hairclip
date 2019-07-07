const HTTP_HEADER = {
    ACCESS_CONTROL_ALLOW_ORIGIN: 'Access-Control-Allow-Origin',
    ASTERISK: '*',
    ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers',
    ORIGIN: 'Origin', 
    X_REQUESTED_WITH: 'X-Requested-With', 
    CONTENT_TYPE: 'Content-Type',
    ACCEPT: 'Accept', 
    AUTHORIZATION: 'Authorization',
    ACCESS_CONTROL_ALLOW_METHODS: 'Access-Control-Allow-Methods',
    METHODS: {
        PUT: 'PUT', 
        POST: 'POST', 
        PATCH: 'PATCH', 
        DELETE: 'DELETE', 
        GET: 'GET'
    }
};

const ENVIRONMENT = {
    DEV: 'dev',
    PROD: 'prod',
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
};

module.exports = {HTTP_HEADER, ENVIRONMENT};