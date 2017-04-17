const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(123);
    res.render('index', { title: 'Express' });
});

module.exports = router;
