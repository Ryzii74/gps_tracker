const mongo = require('mongodb');

let db;

module.exports = {
    async init() {
        db = await mongo.MongoClient.connect('mongodb://localhost:27017/gps');
    },

    get() {
        return db;
    },

    objectId(id) {
        return mongo.ObjectID(id);
    }
};
