const express = require('express');
const path = require('path');

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();
require('./libs/database').init();
require('./middlewares/index')(app);



app.use('/', routes);
app.use('/users', users);
app.use('/points', require('./routes/points'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
});


module.exports = app;
