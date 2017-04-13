const express = require('express');
const db = require('../libs/database');

const router = express.Router();

/* GET home page. */
router.post('/add', (req, res, next) => {
    console.log(req.body);

    const point = {
        lat: Number(req.body.lat),
        lng: Number(req.body.lon),
        time: +new Date(),
        tag: req.body.tag,
    };
    db.get().collection('points').insert(point, (err) => {
        if (err) console.log(err);
    });
});

router.get('/getLast/:tag', (req, res, next) => {
    db.get().collection('points')
        .find({
            tag: req.params.tag,
        }, {
            _id: 0,
            lat: 1,
            lng: 1,
        })
        .limit(1)
        .sort({ time: -1 })
        .toArray((err, users) => {
            let result = {};
            if (err) {
                result = { success: false, error: err };
            } else {
                result = { success: true, data: users[0] };
            }

            res.write(JSON.stringify(result));
            res.end();
        });
});

router.get('/:tag/:limit', (req, res, next) => {
    db.get().collection('points')
        .find({
            tag: req.params.tag,
        }, {
            lat: 1,
            lng: 1,
            _id: 0,
        })
        .limit(Number(req.params.limit) || 20)
        .sort({ _id: -1 })
        .toArray((err, points) => {
            res.write(JSON.stringify(points));
            res.end();
        });
});

module.exports = router;
