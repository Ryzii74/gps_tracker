const express = require('express');
const db = require('./libs/database');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

(async function () {
    await db.init();
    middlewares(app);
    routes(app);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log('listen port', port));
})();
