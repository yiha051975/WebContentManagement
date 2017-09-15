'use strict';
const dao = require('../dao/user-project-role-dao');
const restTemplate = require('../../utils/rest-template');

module.exports = async (req, res, next) => {
    try {
        if (req.user) {
            const results = await dao.findUserProjectRoleByUserId(req.user.id);
            if (Array.isArray(results)) {
                req.user.projects = [];
                for (let i = 0; i < results.length; i++) {
                    let userProjectRole = results[i].toJSON();
                    let project = await restTemplate({
                        host: 'localhost',
                        port: '3000',
                        path: `/projects/getProject/${userProjectRole.projectId}`,
                        method: 'GET',
                        headers: req.headers
                    });
                    let role = await restTemplate({
                        host: 'localhost',
                        port: '3000',
                        path: `/roles/getRole/${userProjectRole.roleId}`,
                        method: 'GET',
                        headers: req.headers
                    });
                    let contents = await restTemplate({
                        host: 'localhost',
                        port: '3000',
                        path: `/contents/getContentByProject/${userProjectRole.projectId}`,
                        method: 'GET',
                        headers: req.headers
                    });

                    req.user.projects.push({
                        project: project.statusCode === 200 ? project.data : undefined,
                        role: role.statusCode === 200 ? role.data : undefined,
                        contents: contents.statusCode === 200 ? contents.data : undefined
                    })
                }
                next();
            } else {
                res.status(404).send({message: 'Projects not found.'});
            }
        } else {
            res.status(401).send({message: 'Unable to authenticate user.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
};