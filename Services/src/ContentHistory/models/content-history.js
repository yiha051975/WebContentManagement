'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('node-uuid');

module.exports = function(dbConnection) {
    const contentHistorySchema = new Schema({
        _id: {
            type: String,
            default: uuid.v4,
        },
        contentId: {
            type: String,
            required: 'ContentId is required'
        },
        userId: {
            type: String,
            required: 'userId is required'
        },
        content: {
            type: String,
            required: 'Content is required'
        },
        updatedTime: {
            type: Date,
            default: Date.now
        }
    }, {
        toObject: {
            transform: function (doc, ret) {
                ret._id = ret.id;
                delete ret.id;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    });

    dbConnection.model('contentHistory', contentHistorySchema);
};