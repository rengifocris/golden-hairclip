const http = require('http');
const https = require('https');
const app = require('./app');
const workers = require('./daily-quote-worker');

const port = process.env.port || 8080;
const porthttps = process.env.port || 8081;

const server = http.createServer(app);
const serverHttps = https.createServer(app);
// start the workers
workers.init();

server.listen(port);
serverHttps.listen(porthttps);
console.log(`HTTP Sever started at port --> ${port}`);
console.log(`HTTPS Sever started at port --> ${porthttps}`);
