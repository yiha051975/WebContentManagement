'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const userConn = mongoose.createConnection(keys.userDBUrl);

const User = userConn.model('users');

function createNewUser(user) {

}

module.exports = {

};