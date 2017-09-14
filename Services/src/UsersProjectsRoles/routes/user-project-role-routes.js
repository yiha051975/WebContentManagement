'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/user-project-role-dao');

router.post('/createUserProjectRole', async (req, res, next) => {
    const userProjectRole = {
        userId: req.body.userId,
        projectId: req.body.projectId,
        roleId: req.body.roleId
    };

    try {
        const result = await dao.createNewUserProjectRole(userProjectRole);
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/getUserProjectRoleByByUser/:userId', async (req, res, next) => {
    try {
        const result = await dao.findUserProjectRoleByUserId(req.params.userId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'UserProjectRole not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

router.get('/getUserProjectRoleByProject/:ProjectId', async (req, res, next) => {
    try {
        const result = await dao.findUserProjectRoleByProjectId(req.params.projectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'UserProjectRole not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

router.put('/updateUserProjectRole', async (req, res, next) => {
    const userProjectRole = {
        userId: req.body.userId,
        projectId: req.body.projectId,
        roleId: req.body.roleId
    };

    try {
        const result = await dao.updateUserProjectRole(userProjectRole);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

router.delete('/removeUserProjectRoleByUser/:userId', async (req, res, next) => {
    try {
        const result = await dao.deleteUserProjectRoleByUserId(req.params.userId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

router.delete('/removeUserProjectRoleByProject/:projectId', async (req, res, next) => {
    try {
        const result = await dao.deleteUserProjectRoleByProjectId(req.params.projectId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;