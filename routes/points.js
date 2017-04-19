const express = require('express');
const db = require('../libs/database');

const router = express.Router();

router.post('/add', async (req, res) => {
    const { lat, lon, tag } = req.body;
    if (!lat || !lon || !tag) return;

    let result;
    const point = {
        lat: Number(lat),
        lng: Number(lon),
        time: +new Date(),
        tag,
    };
    try {
        await db.get().collection('points').insertOne(point);
        result = { success: true };
    } catch (err) {
        console.error('error adding point');
        result = { success: false };
    }
    res.end(JSON.stringify(result));
});

router.get('/getLast/:tag', async (req, res) => {
    let result;
    try {
        const [userPoints] = db.get().collection('points')
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
        result = { success: true, data: userPoints };
    } catch (err) {
        console.error('error getting last points', err);
        result = { success: false, error: err };
    }
    res.end(JSON.stringify(result));
});

router.get('/:tag/:limit', async (req, res, next) => {
    try {
        const { tag, limit } = req.params;
        const points = await db.get().collection('points')
            .find({ tag }, {
                lat: 1,
                lng: 1,
                _id: 0,
            })
            .limit(Number(limit) || 20)
            .sort({ _id: -1 })
            .toArray();
        res.end(JSON.stringify(points));
    } catch (err) {
        console.error('error getting points', err);
        err.status = 404;
        next();
    }
});

module.exports = router;
