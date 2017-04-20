const express = require('express');
const points = require('./points');
const main = require('./main');

module.exports = (app) => {
    app.use('/', main);
    app.use('/points', points);

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};
