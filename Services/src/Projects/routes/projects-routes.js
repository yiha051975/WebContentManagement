'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/projects-dao');

/**
 * @swagger
 * definition:
 *      Project:
 *          properties:
 *              id:
 *                  type: string
 *                  example: 513d644e-47d7-453b-8d6b-18a91446c615
 *              project:
 *                  type: string
 *                  example: test_project_1
 */

/**
 * @swagger
 * /api/projects/getProject/{projectId}:
 *      get:
 *          tags:
 *              - Projects
 *          description: Get Project By projectId
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: projectId
 *                description: projectId String
 *                in: path
 *                type: string
 *                example: 513d644e-47d7-453b-8d6b-18a91446c615
 *          responses:
 *              200:
 *                  description: return an existing project
 *                  schema:
 *                      $ref: '#/definitions/Project'
 *              404:
 *                  description: Project not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Project not found
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/projects/createProject:
 *      post:
 *          tags:
 *              - Projects
 *          description: Create new project
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: project
 *                description: project object
 *                in: body
 *                type: application/json
 *                schema:
 *                      properties:
 *                          project:
 *                              type: string
 *                              example: test_project_2
 *          responses:
 *              200:
 *                  description: return a newly created project
 *                  schema:
 *                      $ref: '#/definitions/Project'
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.post('/createProject', async (req, res, next) => {
    try {
        const result = await dao.createNewProject(req.body.project);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/projects/updateProject:
 *      put:
 *          tags:
 *              - Projects
 *          description: Update existing project
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: project
 *                description: project object
 *                in: body
 *                type: application/json
 *                schema:
 *                      properties:
 *                          project:
 *                              type: string
 *                              example: test_project_2
 *          responses:
 *              200:
 *                  description: return an existing project
 *                  schema:
 *                      $ref: '#/definitions/Project'
 *              404:
 *                  description: Project not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Project not found
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/projects/removeProject/{projectId}:
 *      delete:
 *          tags:
 *              - Projects
 *          description: Delete an existing project by project id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: projectId
 *                description: project id
 *                in: path
 *                type: string
 *                example: 513d644e-47d7-453b-8d6b-18a91446c615
 *          responses:
 *              204:
 *                  description: No content will be returned
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.delete('/removeProject/:projectId', async (req, res, next) => {
    try {
        const result = await dao.deleteProjectById(req.params.projectId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;