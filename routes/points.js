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

router.get('/getLast/:tag', function(req, res, next) {
    global.db.collection('points')
        .find({
            tag : req.params.tag
        }, {
            _id : 0,
            lat : 1,
            lng : 1
        })
        .limit(1)
        .sort({time : -1})
        .toArray(function (err, users) {
            var result = {};
            if (err) {
                result = { success : false, error : err };
            } else {
                result = { success : true, data : users[0] };
            }

            res.write(JSON.stringify(result));
            res.end();
    });
});

router.get('/:tag/:limit', function(req, res, next) {
    global.db.collection('points')
        .find({
            tag : req.params.tag
        }, {
            lat : 1,
            lng : 1,
            _id : 0
        })
        .limit(Number(req.params.limit) || 20)
        .sort({ _id : -1 })
        .toArray(function (err, points) {
            res.write(JSON.stringify(points));
            res.end();
    });
});

module.exports = router;
