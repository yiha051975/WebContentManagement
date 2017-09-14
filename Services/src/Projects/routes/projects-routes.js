'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/projects-dao');

router.get('/getProject/:projectId', async (req, res, next) => {
    try {
        const result = await dao.findProjectById(req.params.projectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'Project not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

router.post('/createProject', async (req, res, next) => {
    try {
        const result = await dao.createNewProject(req.body.project);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

router.put('/updateProject', async (req, res, next) => {
    try {
        const result = await dao.updateProject(req.body.id, {project: req.body.project});
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'Project not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

router.delete('/removeProject/:projectId', async (req, res, next) => {
    try {
        const result = await dao.deleteProjectById(req.params.projectId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;