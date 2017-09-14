'use strict';
const dao = require('../dao/user-project-role-dao');
const restTemplate = require('../../utils/rest-template');

module.exports = async (req, res, next) => {
    try {
        if (req.user) {
            const results = await dao.findUserProjectRoleByUserId(req.user.id);
            const projects = results.toJSON();
            if (Array.isArray(projects)) {
                req.user.projects = projects.map(async project => {
                    return {
                        project: await restTemplate({
                            host: 'localhost',
                            port: '3000',
                            path: `/projects/getProject/${project.projectId}`,
                            method: 'GET',
                            headers: req.headers
                        }),
                        role: await restTemplate({
                            host: 'localhost',
                            port: '3000',
                            path: `/roles/getRole/${project.roleId}`,
                            method: 'GET',
                            headers: req.headers
                        }),
                        contents: await restTemplate({
                            host: 'localhost',
                            port: '3000',
                            path: `/contents/getContentByProject/${project.projectId}`,
                            method: 'GET',
                            headers: req.headers
                        })
                    }
                });
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