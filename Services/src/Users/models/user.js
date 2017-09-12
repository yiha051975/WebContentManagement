const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('node-uuid');

const userSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    email: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    roles: [{
        type: String
    }],
    projects: [{
        type: String
    }]
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

mongoose.model('users', userSchema);