const express = require('express');
const db = require('./libs/database');
const middlewares = require('./middlewares');
const routes = require('./routes');
const config = require('../config');

const app = express();

(async function () { // eslint-disable-line wrap-iife
    await db.init();
    middlewares(app);
    routes(app);

    const { port } = config;
    app.listen(port, () => console.log('listen port', port));
})();
