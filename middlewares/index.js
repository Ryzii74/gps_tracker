const logger = require('morgan');
const cookieParser = require('cookie-parser');

const bodyParserMiddleware = require('./bodyParser');
const viewMiddleware = require('./view');

module.exports = (app) => {
    viewMiddleware(app);
    bodyParserMiddleware(app);

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
};