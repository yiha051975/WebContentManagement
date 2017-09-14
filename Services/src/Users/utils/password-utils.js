'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    saltAndHash: function(password, saltRounds = 10) {
        return bcrypt.hash(password, saltRounds);
    },
    comparePassword: function(password, encryptedPassword) {
        return bcrypt.compare(password, encryptedPassword);
    }
};