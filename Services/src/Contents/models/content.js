'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('node-uuid');

module.exports = function(dbConnection) {
    const contentSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v4,
        },
        projectId: {
            type: String,
            required: 'ProjectId is required'
        },
        content: {
            type: String,
            required: 'Content is required'
        },
        contentName: {
            type: String,
            unique: true,
            required: 'Content Name is required'
        },
        comment: {
            type: String,
            default: ''
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

    dbConnection.model('contents', contentSchema);
};