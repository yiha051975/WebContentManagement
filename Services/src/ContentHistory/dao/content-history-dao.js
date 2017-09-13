'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const keys = require('../config/keys');
const contentHistoryConn = mongoose.createConnection(keys.contentHistoryDBUrl);
require('../models/content-history')(contentHistoryConn);
const ContentHistory = contentHistoryConn.model('contents');

function createOrUpdateContentHistory(contentHistory) {
    return ContentHistory.findOneAndUpdate({_id: contentHistory.id}, contentHistory, {upsert: true, setDefaultsOnInsert: true, new: true});
}

module.exports = {
    createOrUpdateContentHistory
};