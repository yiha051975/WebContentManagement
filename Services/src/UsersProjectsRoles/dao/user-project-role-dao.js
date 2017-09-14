'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const userProjectRoleConn = mongoose.createConnection(keys.userProjectRoleDBUrl);
require('../models/user-project-role')(userProjectRoleConn);
const UserProjectRole = userProjectRoleConn.model('userProjectRole');

function createNewUserProjectRole(userProjectRole) {
    const userProjectRoleSchema = new UserProjectRole(userProjectRole);

    return userProjectRoleSchema.save();
}

function updateUserProjectRole(userProjectRole) {
    return UserProjectRole.findOneAndUpdate({_id: userProjectRole.id}, userProjectRole, {new: true});
}

function findUserProjectRoleByUserId(userId) {
    return UserProjectRole.find({userId}).exec();
}

function findUserProjectRoleByProjectId(projectId) {
    return UserProjectRole.find({projectId}).exec();
}

function deleteUserProjectRoleByUserId(userId) {
    return UserProjectRole.remove({userId});
}

function deleteUserProjectRoleByProjectId(projectId) {
    return UserProjectRole.remove({projectId});
}

module.exports = {
    createNewUserProjectRole,
    findUserProjectRoleByUserId,
    findUserProjectRoleByProjectId,
    updateUserProjectRole,
    deleteUserProjectRoleByUserId,
    deleteUserProjectRoleByProjectId
};