const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://m220-student:m220-password@mflix.zbubd.mongodb.net/admin';

module.exports = new MongoClient(uri, {
    useUnifiedTopology: true, useNewUrlParser: true
});