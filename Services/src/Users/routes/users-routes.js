'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.get('/', (req, res, next) => {
    res.send({test: 'user'});
});

module.exports = router;