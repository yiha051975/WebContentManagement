const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const users = require('./Users/routes/users-routes');
const roles = require('./Roles/routes/roles-routes');
const cors = require('cors');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Actual Rest API
app.use('/users', users);
app.use('/roles', roles);

app.listen(3000, function () {
    console.log('Service listening on port 3000!')
});