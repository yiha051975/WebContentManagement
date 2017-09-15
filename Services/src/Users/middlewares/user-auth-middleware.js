'use strict';
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const dao = require('../dao/users-dao');

module.exports = (req, res, next) => {
    // verifies secret and checks exp
    jwt.verify(req.cookies.token, keys.jwtPrivateKey, async function(err, decoded) {
        if (err) {
            res.clearCookie('token');
            res.status(401).send({message: 'Unable to authenticate user.'});
        } else {
            const user = await dao.getUserByUserId(decoded.id);

            if (user) {
                // if everything is good, save to request for use in other routes
                req.user = user.toJSON();
                const token = jwt.sign({id: req.user.id}, keys.jwtPrivateKey, {
                    expiresIn: 60 * 60 // expires in 1 hour
                });

                // set token in the cookie
                res.cookie('token', token, {
                    secure: process.env.NODE_ENV === 'production', // force browser to send cookie only in https request
                    httpOnly: true
                });
                
                next();
            } else {
                res.clearCookie('token');
                res.status(401).send({message: 'Unable to authenticate user.'});
            }
        }
    });
};