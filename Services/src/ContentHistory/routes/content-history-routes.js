'use strict';
const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const dao = require('../dao/content-history-dao');

router.post('/createContentHistory', async (req, res, next) => {
    try {
        const result = await dao.createOrUpdateContentHistory(req.body);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;