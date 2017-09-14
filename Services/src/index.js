const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const users = require('./Users/routes/users-routes');
const roles = require('./Roles/routes/roles-routes');
const projects = require('./Projects/routes/projects-routes');
const userProjectRoles = require('./UsersProjectsRoles/routes/user-project-role-routes');
const contents = require('./Contents/routes/contents-routes');
const contentHistory = require('./ContentHistory/routes/content-history-routes');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static('public'));
}

// Actual Rest API
app.use('/users', users);
app.use('/roles', roles);
app.use('/projects', projects);
app.use('/userProjectRoles', userProjectRoles);
app.use('/contents', contents);
app.use('/contentHistory', contentHistory);

app.listen(3000, function () {
    console.log('Service listening on port 3000!')
});