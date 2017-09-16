'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/roles-dao');

/**
 * @swagger
 * definition:
 *      Role:
 *          properties:
 *              id:
 *                  type: string
 *                  example: a37835ec-aedd-43a4-9e0b-4eea0fa52a84
 *              role:
 *                  type: string
 *                  example: admin
 */

/**
 * @swagger
 * /api/roles/getRole/{roleId}:
 *      get:
 *          tags:
 *              - Roles
 *          description: Get Role By roleId
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: roleId
 *                description: roleId String
 *                in: path
 *                type: string
 *                example: a37835ec-aedd-43a4-9e0b-4eea0fa52a84
 *          responses:
 *              200:
 *                  description: An existing role object
 *                  schema:
 *                      $ref: '#/definitions/Role'
 *              404:
 *                  description: Role not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: role not found
 *              500:
 *                  description: Server side error
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/roles/createRole:
 *      post:
 *          tags:
 *              - Roles
 *          description: Create new Role
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: role
 *                description: role object
 *                in: body
 *                type: application/json
 *                schema:
 *                  properties:
 *                      role:
 *                          type: string
 *                          example: test_role
 *                          required: true
 *          responses:
 *              201:
 *                  description: new role object
 *                  schema:
 *                      $ref: '#/definitions/Role'
 *              500:
 *                  description: Server side error
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.post('/createRole', async (req, res, next) => {
    try {
        const result = await dao.createNewRole(req.body.role);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/roles/updateRole/{roleId}:
 *      put:
 *          tags:
 *              - Roles
 *          description: Update existing role
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: roleId
 *                description: role id
 *                in: path
 *                type: string
 *                example: 10c75874-739c-4e13-9380-cc5979382367
 *              - name: role
 *                description: Updated role
 *                in: body
 *                type: application/json
 *                schema:
 *                  properties:
 *                      role:
 *                          type: string
 *                          example: read_access_1
 *                          required: true
 *          responses:
 *              200:
 *                  description: Existing role has been updated
 *                  schema:
 *                      $ref: '#/definitions/Role'
 *              404:
 *                  description: Unable to find the role base on role id
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: role not found
 *              500:
 *                  description: Server side error
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/roles/removeRole/{roleId}:
 *      delete:
 *          tags:
 *              - Roles
 *          description: delete existing role
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: roleId
 *                description: roleId String
 *                in: path
 *                type: string
 *                example: 10c75874-739c-4e13-9380-cc5979382367
 *          responses:
 *              204:
 *                  description: Role has been deleted. No content will be returned
 *              500:
 *                  description: Unable to delete Role
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.delete('/removeRole/:roleId', async (req, res, next) => {
    try {
        const result = await dao.deleteRoleById(req.params.roleId);
        res.status(204).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;