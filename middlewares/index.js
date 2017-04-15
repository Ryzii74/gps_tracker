const cookieParser = require('cookie-parser');

const bodyParserMiddleware = require('./bodyParser');
const viewMiddleware = require('./view');
const loggerParser = require('./logger');

module.exports = (app) => {
    viewMiddleware(app);
    bodyParserMiddleware(app);
    loggerParser(app);

    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
};