'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const roleConn = mongoose.createConnection(keys.projectDBUrl);
require('../models/project')(roleConn);
const Project = roleConn.model('projects');

function createNewProject(projectStr) {
    const projectSchema = new Project({
        project: projectStr
    });

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
    createNewProject,
    findProjectById,
    updateProject,
    deleteProjectById
};