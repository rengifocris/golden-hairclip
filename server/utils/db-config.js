const dbConfig = {
    dbUser: 'node-shop',
    dbPassword: 'node-shop',
    cluster: 'localhost:27017', //typically use 'localhost:27017' for a local mongo db cluster0-7ppfr.mongodb.net
    dbName: 'test',
    connection: 'mongodb',//Use 'mongodb+srv' for  DNS SRV record and 'mongodb'  for a local DB
    runlocal:true // set to true when using a local db
}

module.exports = dbConfig;
