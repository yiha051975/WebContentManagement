'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const contentHistoryConn = mongoose.createConnection(keys.contentHistoryDBUrl);
require('../models/content-history')(contentHistoryConn);
const ContentHistory = contentHistoryConn.model('contentHistory');

function createOrUpdateContentHistory(contentHistory) {
    const contentHistorySchema = new ContentHistory(contentHistory);

    return contentHistorySchema.save();
}

module.exports = {
    createOrUpdateContentHistory
};