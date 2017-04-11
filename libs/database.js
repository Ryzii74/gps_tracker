const MongoClient = require('mongodb').MongoClient;

let db;

module.exports = {
    async init() {
        db = await MongoClient.connect('mongodb://localhost:27017/gps');
    },

    get() {
        return db;
    },
};
