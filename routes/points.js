const express = require('express');
const db = require('../libs/database');

const router = express.Router();

router.post('/add', async (req, res) => {
    const point = {
        lat: Number(req.body.lat),
        lng: Number(req.body.lon),
        time: +new Date(),
        tag: req.body.tag,
    };
    try {
        await db.get().collection('points').insert(point)
    } catch (err) {
        console.error('error adding point');
    }
});

router.get('/getLast/:tag', async (req, res) => {
    let result;
    try {
        const users = db.get().collection('points')
            .find({
                tag: req.params.tag,
            }, {
                _id: 0,
                lat: 1,
                lng: 1,
            })
            .limit(1)
            .sort({ time: -1 })
            .toArray();
        result = { success: true, data: users[0] };
    } catch (err) {
        console.error('error getting last points', err);
        result = { success: false, error: err };
    }
    res.end(JSON.stringify(result));
});

router.get('/:tag/:limit', async (req, res) => {
    try {
        const points = await db.get().collection('points')
            .find({
                tag: req.params.tag,
            }, {
                lat: 1,
                lng: 1,
                _id: 0,
            })
            .limit(Number(req.params.limit) || 20)
            .sort({ _id: -1 })
            .toArray();
        res.end(JSON.stringify(points));
    } catch (err) {
        console.error('error getting points', err);
    }
});

module.exports = router;
