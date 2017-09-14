'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const contentHistoryConn = mongoose.createConnection(keys.contentHistoryDBUrl);
require('../models/content-history')(contentHistoryConn);
const ContentHistory = contentHistoryConn.model('contentHistory');

function createContentHistory(contentHistory) {
    const contentHistorySchema = new ContentHistory(contentHistory);

    return contentHistorySchema.save();
}

function getCotentHistoryByContentId(contentId) {
    return ContentHistory.find({contentId}).sort({updatedTime: -1}).exec();
}

module.exports = {
    createContentHistory,
    getCotentHistoryByContentId
};