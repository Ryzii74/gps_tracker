const bodyParserMiddleware = require('./bodyParser');
const viewMiddleware = require('./view');
const loggerParserMiddleware = require('./logger');
const staticMiddleware = require('./static');
const cookieMiddleware = require('./cookie');

module.exports = (app) => {
    viewMiddleware(app);
    bodyParserMiddleware(app);
    loggerParserMiddleware(app);
    staticMiddleware(app);
    cookieMiddleware(app);
};
