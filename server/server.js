const http = require('http');
const app = require('./app');
const workers = require('./daily-quote-worker');

const port = process.env.port || 3000;

const server = http.createServer(app);
// start the workers
workers.init();

server.listen(port);
console.log(`Sever started at port --> ${port}`);
