var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/add', function(req, res, next) {
    console.log(req.body);

    var point = {
        lat : Number(req.body.lat),
        lng : Number(req.body.lon),
        time : +new Date(),
        tag : req.body.tag
    };
    global.db.collection('points').insert(point, function (err) {
        if (err) return console.log(err);

    });
});

router.get('/:tag', function(req, res, next) {
    global.db.collection('points')
        .find({
            tag : req.params.tag
        }, {
            lat : 1,
            lng : 1,
            _id : 0
        })
        .limit(100)
        .sort({ _id : -1 })
        .toArray(function (err, points) {
            res.write(JSON.stringify(points));
            res.end();
    });
});

module.exports = router;
