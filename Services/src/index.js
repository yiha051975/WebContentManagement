const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('./Users/routes/users-routes');
const roles = require('./Roles/routes/roles-routes');
const contents = require('./Contents/routes/contents-routes');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());

// Actual Rest API
app.use('/users', users);
app.use('/roles', roles);

app.use('/contents', contents);

app.listen(3000, function () {
    console.log('Service listening on port 3000!')
});