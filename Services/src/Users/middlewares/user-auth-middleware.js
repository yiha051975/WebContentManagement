'use strict';
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const dao = require('../dao/users-dao');

module.exports = (req, res, next) => {
    // verifies secret and checks exp
    jwt.verify(req.cookies.token, keys.jwtPrivateKey, async function(err, decoded) {
        if (err) {
            res.status(401).send({message: 'Unable to authenticate user.'});
        } else {
            const user = await dao.getUserByUserId(decoded.id);

            if (user) {
                // if everything is good, save to request for use in other routes
                req.user = user.toJSON();
                next();
            } else {
                res.status(401).send({message: 'Unable to authenticate user.'});
            }
        }
    });
};