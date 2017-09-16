const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('node-uuid');

module.exports = function(dbConnection) {
    const userProjectRoleSchema = new Schema({
        _id: {
            type: String,
            default: uuid.v4
        },
        userId: {
            type: String,
            required: 'UserId is required.'
        },
        projectId: {
            type: String,
            required: 'ProjectId is required.'
        },
        roleId: {
            type: String,
            required: 'RoleId is required.'
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

    userProjectRoleSchema.index({userId: 1, projectId: 1}, {unique: true});

    dbConnection.model('userProjectRole', userProjectRoleSchema);
};