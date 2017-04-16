const express = require('express');

const users = require('./users');
const map = require('./map');
const points = require('./points');

module.exports = (app) => {
    app.use('/map', map);
    app.use('/users', users);
    app.use('/points', points);

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};
