'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('node-uuid');

module.exports = function(dbConnection) {
    const roleSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v4,
        },
        role: {
            type: String,
            unique: true
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

    dbConnection.model('roles', roleSchema);
};