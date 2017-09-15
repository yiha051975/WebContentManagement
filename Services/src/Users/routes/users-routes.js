'use strict';
const express = require('express');
const router = express.Router();
const passwordUtils = require('../utils/password-utils');
const dao = require('../dao/users-dao');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const userAuth = require('../middlewares/user-auth-middleware');
const userProjectRoleMiddleware = require('../../UsersProjectsRoles/middlewares/user-project-role-middleware');

/**
 * @swagger
 * definition:
 *      User:
 *          properties:
 *              active:
 *                  type: boolean
 *                  example: true
 *              email:
 *                  type: string
 *                  example: test@test.com
 *              firstName:
 *                  type: string
 *                  example: test_firstName
 *              id:
 *                  type: string
 *                  example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *              lastName:
 *                  type: string
 *                  example: test_lastName
 *              username:
 *                  type: string
 *                  example: test_username
 */

/**
 * @swagger
 * /api/users/createUser:
 *      post:
 *          tags:
 *              - Users
 *          description: Create new user
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: User
 *                description: User Object
 *                in: body
 *                type: application/json
 *                schema:
 *                  properties:
 *                      email:
 *                          type: string
 *                          example: test@test.com
 *                      firstName:
 *                          type: string
 *                          example: test_firstName
 *                      lastName:
 *                          type: string
 *                          example: test_lastName
 *                      password:
 *                          type: string
 *                          example: test_password
 *                      username:
 *                          type: string
 *                          example: test_username
 *          responses:
 *              201:
 *                  description: new user object
 *                  schema:
 *                      $ref: '#/definitions/User'
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Unable to create User
 */
router.post('/createUser', async (req, res, next) => {
    try {
        const encryptedPassword = await passwordUtils.saltAndHash(req.body.password);
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: encryptedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };

        const result = await dao.createNewUser(user);

        if (result) {
            const response = result.toJSON();
            const token = jwt.sign({id: response.id}, keys.jwtPrivateKey, {
                expiresIn: 60 * 60 // expires in 1 hour
            });

            // set token in the cookie
            res.cookie('token', token, {
                secure: process.env.NODE_ENV === 'production', // force browser to send cookie only in https request
                httpOnly: true
            });

            delete response.password;
            res.status(201).json(response);
        } else {
            res.status(500).send({message: 'Unable to create User'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/users/authenticate:
 *      post:
 *          tags:
 *              - Users
 *          description: Authenticate user
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: Username and password
 *                description: Username and password
 *                in: body
 *                type: application/json
 *                schema:
 *                  properties:
 *                      password:
 *                          type: string
 *                          example: test_password
 *                      username:
 *                          type: string
 *                          example: test_username
 *          responses:
 *              200:
 *                  description: Authenticated user object
 *                  schema:
 *                      $ref: '#/definitions/User'
 *              401:
 *                  description: Unable to authenticate
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Incorrect Username or password.
 *              404:
 *                  description: User not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: User not found.
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.post('/authenticate', async (req, res, next) => {
    try {
        const result = await dao.getUserByUsrname(req.body.username);
        if (result) {
            const response = result.toJSON();
            if (passwordUtils.comparePassword(req.body.password, response.password)) {
                const token = jwt.sign({id: response.id}, keys.jwtPrivateKey, {
                    expiresIn: 60 * 60 // expires in 1 hour
                });

                // set token in the cookie
                res.cookie('token', token, {
                    secure: process.env.NODE_ENV === 'production', // force browser to send cookie only in https request
                    httpOnly: true
                });

                delete response.password;
                res.status(200).send(response);
            } else {
                res.status(401).send({message: 'Incorrect Username or password.'});
            }
        } else {
            res.status(404).send({message: 'User not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/users/logout:
 *      get:
 *          tags:
 *              - Users
 *          description: Log off a user
 *          produces:
 *              - N/A
 *          responses:
 *              204:
 *                  description: No Content will be returned
 */
router.get('/logout', (req, res, next) => {
    res.clearCookie('token');
    res.status(204).send();
});

/**
 * @swagger
 * /api/users/authenticate:
 *      put:
 *          tags:
 *              - Users
 *          description: Update user
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: User
 *                description: User Object
 *                in: body
 *                type: application/json
 *                schema:
 *                  properties:
 *                      email:
 *                          type: string
 *                          example: test@test.com
 *                      firstName:
 *                          type: string
 *                          example: test_firstName
 *                      lastName:
 *                          type: string
 *                          example: test_lastName
 *                      password:
 *                          type: string
 *                          example: test_password
 *                      username:
 *                          type: string
 *                          example: test_username
 *          responses:
 *              200:
 *                  description: Updated user object
 *                  schema:
 *                      $ref: '#/definitions/User'
 *              404:
 *                  description: User not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Unable to update user.
 *              500:
 *                  description: Unable to create User
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.put('/updateUser/:userId', userAuth, async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await passwordUtils.saltAndHash(req.body.password);
        }
        const result = await dao.updateUser(req.params.userId, req.body);
        if (result) {
            const response = result.toJSON();
            delete response.password;
            res.status(200).send(response);
        } else {
            res.status(404).send({message: "Unable to Update User."});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

if (process.env.NODE_ENV !== 'production') {
    router.get('/testCookie', userAuth, userProjectRoleMiddleware, (req, res, next) => {
        res.status(200).send();
    });
}

module.exports = router;