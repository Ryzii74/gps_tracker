const cookieParser = require('cookie-parser');

const bodyParserMiddleware = require('./bodyParser');
const viewMiddleware = require('./view');
const loggerParserMiddleware = require('./logger');
const staticMiddleware = require('./static');

module.exports = (app) => {
    viewMiddleware(app);
    bodyParserMiddleware(app);
    loggerParserMiddleware(app);
    staticMiddleware(app);

    app.use(cookieParser());
};
