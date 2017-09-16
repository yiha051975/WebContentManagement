'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/user-project-role-dao');

/**
 * @swagger
 * definition:
 *      UserProjectRole:
 *          properties:
 *              id:
 *                  type: string
 *                  example: 40211844-37c9-4479-bf8f-878ff55f29d3
 *              userId:
 *                  type: string
 *                  example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *              projectId:
 *                  type: string
 *                  example: 513d644e-47d7-453b-8d6b-18a91446c615
 *              roleId:
 *                  type: string
 *                  example: 4e3cde61-221c-42ce-8dcc-f5e456722948
 */

/**
 * @swagger
 * /api/userProjectRoles/createUserProjectRole:
 *      post:
 *          tags:
 *              - UsersProjectRoles
 *          description: Joint Table between User, Project and Role tables
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: UserProjectRole
 *                description: UserProjectRole Object
 *                in: body
 *                type: application/json
 *                schema:
 *                  properties:
 *                      userId:
 *                          type: string
 *                          example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *                      projectId:
 *                          type: string
 *                          example: 513d644e-47d7-453b-8d6b-18a91446c615
 *                      roleId:
 *                          type: string
 *                          example: 4e3cde61-221c-42ce-8dcc-f5e456722948
 *          responses:
 *              201:
 *                  description: new UserProjectRole object
 *                  schema:
 *                      $ref: '#/definitions/UserProjectRole'
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/userProjectRoles/getUserProjectRoleByByUser/{userId}:
 *      get:
 *          tags:
 *              - UsersProjectRoles
 *          description: Retreive UserProjectRole by userId
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: userId
 *                description: userId string
 *                in: path
 *                type: string
 *                required: true
 *                example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *          responses:
 *              200:
 *                  description: Retrieve all the UserProjectRoles by the provided userId
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/UserProjectRole'
 *              404:
 *                  description: UserProjectRole not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: UserProjectRole not found
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/userProjectRoles/getUserProjectRoleByProject/{projectId}:
 *      get:
 *          tags:
 *              - UsersProjectRoles
 *          description: Retrieve UserProjectRole by projectId
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: projectId
 *                description: projectId string
 *                in: path
 *                type: string
 *                required: true
 *                example: 513d644e-47d7-453b-8d6b-18a91446c615
 *          responses:
 *              200:
 *                  description: Retrieve UserProjectRole by the provided projectId
 *                  schema:
 *                      $ref: '#/definitions/UserProjectRole'
 *              404:
 *                  description: UserProjectRole not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: UserProjectRole not found
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.get('/getUserProjectRoleByProject/:projectId', async (req, res, next) => {
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

/**
 * @swagger
 * /api/userProjectRoles/updateUserProjectRole/:
 *      put:
 *          tags:
 *              - UsersProjectRoles
 *          description: Retrieve UserProjectRole by projectId
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: UserProjectRole
 *                description: UserProjectRole object
 *                in: body
 *                type: application/json
 *                required: true
 *                schema:
 *                  properties:
 *                      userId:
 *                          type: string
 *                          example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *                      projectId:
 *                          type: string
 *                          example: 513d644e-47d7-453b-8d6b-18a91446c615
 *                      roleId:
 *                          type: string
 *                          example: 4e3cde61-221c-42ce-8dcc-f5e456722948
 *          responses:
 *              200:
 *                  description: Updated the existing UserProjectRole base on the provided userId and projectId
 *                  schema:
 *                      $ref: '#/definitions/UserProjectRole'
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.put('/updateUserProjectRole', async (req, res, next) => {
    const userProjectRole = {
        userId: req.body.userId,
        projectId: req.body.projectId,
        roleId: req.body.roleId
    };

    try {
        const result = await dao.updateUserProjectRole(userProjectRole);
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/userProjectRoles/removeUserProjectRoleByUser/{userId}:
 *      delete:
 *          tags:
 *              - UsersProjectRoles
 *          description: Delete UserProjectRoles by User id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: userId
 *                description: userId string
 *                in: path
 *                type: string
 *                required: true
 *                example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *          responses:
 *              204:
 *                  description: Deleted all the UserProjectRoles from db base on the provided UserId
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.delete('/removeUserProjectRoleByUser/:userId', async (req, res, next) => {
    try {
        const result = await dao.deleteUserProjectRoleByUserId(req.params.userId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/userProjectRoles/removeUserProjectRoleByProject/{projectId}:
 *      delete:
 *          tags:
 *              - UsersProjectRoles
 *          description: Delete UserProjectRoles by Project id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: projectId
 *                description: projectId string
 *                in: path
 *                type: string
 *                required: true
 *                example: 513d644e-47d7-453b-8d6b-18a91446c615
 *          responses:
 *              204:
 *                  description: Deleted all the UserProjectRoles from db base on the provided UserId
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.delete('/removeUserProjectRoleByProject/:projectId', async (req, res, next) => {
    try {
        const result = await dao.deleteUserProjectRoleByProjectId(req.params.projectId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;