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
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'Web Content Management API',
            version: '1.0.0',
            description: 'Web Content Management API'
        },
        host: 'localhost:3000',
        basePath: '/'
    },
    apis: ['./*/routes/*.js']
});

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());

if (process.env.NODE_ENV !== 'production') {
    app.use(express.static('public'));
}

// Actual Rest API
app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/projects', projects);
app.use('/api/userProjectRoles', userProjectRoles);
app.use('/api/contents', contents);
app.use('/api/contentHistory', contentHistory);

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.listen(3000, function () {
    console.log('Service listening on port 3000!')
});