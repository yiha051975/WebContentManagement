'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/roles-dao');

router.get('/getRole/:roleId', async (req, res, next) => {
    try {
        const result = await dao.findRoleById(req.params.roleId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'role not found'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

router.post('/createRole', async (req, res, next) => {
    try {
        const result = await dao.createNewRole(req.body.role);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

router.put('/updateRole/:roleId', async (req, res, next) => {
    try {
        const result = await dao.updateRole(req.params.roleId, req.body);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'role not found'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

router.delete('/removeRole/:roleId', async (req, res, next) => {
    try {
        const result = await dao.deleteRoleById(req.params.roleId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;