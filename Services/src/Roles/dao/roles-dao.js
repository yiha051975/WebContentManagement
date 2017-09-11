'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const roleConn = mongoose.createConnection(keys.roleDBUrl);
require('../models/role')(roleConn);
const Role = roleConn.model('roles');

function createNewRole(role) {
    const roleSchema = new Role({
        role
    });

    return roleSchema.save();
}

function updateRole(roleId, role) {
    return Role.findOneAndUpdate({_id: roleId}, role, {new: true});
}

function findRoleById(id) {
    return Role.findById(id).exec();
}

function deleteRoleById(_id) {
    return Role.remove({_id});
}

module.exports = {
    createNewRole,
    findRoleById,
    updateRole,
    deleteRoleById
};