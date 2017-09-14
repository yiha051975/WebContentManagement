'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/content-history-dao');

router.post('/createContentHistory', async (req, res, next) => {
    try {
        const result = await dao.createContentHistory(req.body);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

router.get('/getContentHistory/:contentId', async (req, res, next) => {
    try {
        const result = await dao.getCotentHistoryByContentId(req.params.contentId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'Content History not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;