'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const userConn = mongoose.createConnection(keys.userDBUrl);
require('../models/user')(userConn);
const User = userConn.model('user');

function createNewUser(user) {
    const userSchema = new User(user);

    return userSchema.save();
}

function getUserByUsrname(username) {
    return User.findOne({username}).exec();
}

function getUserByUserId(userId) {
    return User.findById(userId).exec();
}

function updateUser(userId, user) {
    return User.findOneAndUpdate({_id: userId}, user, {new: true});
}

module.exports = {
    createNewUser,
    getUserByUsrname,
    getUserByUserId,
    updateUser
};