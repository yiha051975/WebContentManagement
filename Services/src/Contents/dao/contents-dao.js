'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const roleConn = mongoose.createConnection(keys.contentDBUrl);
require('../models/content')(roleConn);
const Content = roleConn.model('contents');

function createNewContent(content) {
    const contentSchema = new Content(content);

    return projectSchema.save();
}

function updateProject(projectId, project) {
    return Project.findOneAndUpdate({_id: projectId}, project, {new: true});
}

function findProjectById(id) {
    return Project.findById(id).exec();
}

function deleteProjectById(_id) {
    return Project.remove({_id});
}

module.exports = {
    createNewContent,
    findProjectById,
    updateProject,
    deleteProjectById
};