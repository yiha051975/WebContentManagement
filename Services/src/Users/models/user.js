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
    }]
}, {
    id: false
});

mongoose.model('users', userSchema);