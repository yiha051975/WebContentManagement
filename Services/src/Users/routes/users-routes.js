'use strict';
const express = require('express');
const router = express.Router();
const passwordUtils = require('../utils/password-utils');
const dao = require('../dao/users-dao');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const userAuth = require('../middlewares/user-auth-middleware');

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
            res.status(500).send();
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

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

router.get('/logout', (req, res, next) => {
    res.clearCookie('token');
    res.status(204).send();
});

router.put('/updateUser', userAuth, async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await passwordUtils.saltAndHash(req.body.password);
        }
        const result = await dao.updateUser(req.user.id, req.body);
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
    router.get('/testCookie', userAuth, (req, res, next) => {
        res.status(200).send();
    });
}

module.exports = router;