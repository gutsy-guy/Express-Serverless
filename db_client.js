//REFERENCE: https://docs.atlas.mongodb.com/driver-connection/
const mongodb = require('mongodb').MongoClient;
const database_url = 'mongodb+srv://PJFC_USER:'+process.env.MONGO_DB_PASSWORD+'@cluster0-5xg3p.mongodb.net/test?retryWrites=true&w=majority'
const client = new mongodb(database_url, {useNewUrlParser:true, useUnifiedTopology:true})

module.exports = client