const mongo = require('mongodb');
const config = require('../config');

let db;

module.exports = {
    async init() {
        db = await mongo.MongoClient.connect(config.db);
    },

    get() {
        return db;
    },

    objectId(id) {
        return mongo.ObjectID(id);
    },
};
