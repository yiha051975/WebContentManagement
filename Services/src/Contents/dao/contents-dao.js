'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const roleConn = mongoose.createConnection(keys.contentDBUrl);
require('../models/content')(roleConn);
const Content = roleConn.model('contents');
const Gridfs = require('gridfs-stream');
const fs = require('fs');
const gfs = new Gridfs(roleConn.db, mongoose.mongo);

function createNewContent(content) {
    const contentSchema = new Content(content);

    return contentSchema.save();
}

function updateProject(contentId, content) {
    return Content.findOneAndUpdate({_id: contentId}, content, {new: true});
}

function findProjectById(id) {
    return Content.findById(id).exec();
}

function deleteProjectById(_id) {
    return Content.remove({_id});
}

function persistFile(file, callback = () => {}) {
    const writeStream = gfs.createWriteStream({
        filename: file.originalFilename,
        mode: 'w',
        content_type: file.headers['content-type']
    });

    writeStream.on('close', persistedFile => {
        fs.unlinkSync(file.path);
        callback(persistedFile);
    });

    fs.createReadStream(file.path).pipe(writeStream);
}

function retrieveFile(_id) {
    return gfs.createReadStream({
        _id
    });
}

function retrieveFileMeta(_id, callback = () => {}) {
    return gfs.findOne({_id}, callback);
}

module.exports = {
    createNewContent,
    findProjectById,
    updateProject,
    deleteProjectById,
    persistFile,
    retrieveFile,
    retrieveFileMeta
};