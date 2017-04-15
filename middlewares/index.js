const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const viewMiddleware = require('./view');

module.exports = (app) => {
    viewMiddleware(app);

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
};