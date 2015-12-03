var MongoClient = require('mongodb').MongoClient;

module.exports.init = function () {
    MongoClient.connect('mongodb://localhost:27017/gps', function(err, db) {
        if (err) return console.log(err);

        global.db = db;
    });
};