'use strict';
const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const dao = require('../dao/contents-dao');
const _ = require('lodash');
const restTemplate = require('../../utils/rest-template');
const userAuth = require('../../Users/middlewares/user-auth-middleware');
const userProjectRoleMiddleware = require('../../UsersProjectsRoles/middlewares/user-project-role-middleware');

router.get('/getFile/:fileId', (req, res, next) => {
    dao.retrieveFileMeta(req.params.fileId, (err, file) => {
        if (err) {
            res.status(500).send(err);
        } else if (!file) {
            res.status(404).send({message: 'File not found.'});
        } else {
            const readStream = dao.retrieveFile(req.params.fileId);
            res.set('Content-Type', file.contentType);
            res.set('Content-Disposition', `inline; filename=${file.filename}`);
            readStream.pipe(res);
        }
    });
});

router.post('/createContent', userAuth, userProjectRoleMiddleware, async (req, res, next) => {
    if (req.body.content) {
        return saveNewContent(res, req.body, req.headers, req.user.id);
    } else {
        const form = new multiparty.Form();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const content = {
                    projectId: _.get(fields, ['projectId', '0'], undefined),
                    contentName: _.get(fields, ['contentName', '0'], undefined),
                    comment: _.get(fields, ['comment', '0'], undefined)
                };
                if (files.content) {
                    dao.persistFile(files.content[0], persistedFile => {
                        content.content = `http://localhost:3000/contents/getFile/${persistedFile._id}`;

                        return saveNewContent(res, content, req.headers, req.user.id);
                    });
                } else {
                    content.content = _.get(fields, ['content', '0'], undefined);

                    return saveNewContent(res, content, req.headers, req.user.id);
                }
            }
        });
    }
});

async function saveNewContent(res, content, headers, userId) {
    try {
        const result = await dao.createNewContent(content);
        const contentHistory = {
            contentId: result._id,
            userId,
            content: result.content,
            comment: result.comment
        };
        headers['Content-Type'] = 'application/json';

        const response = await restTemplate({
            host: 'localhost',
            port: '3000',
            path: '/contentHistory/createContentHistory',
            method: 'POST',
            headers
        }, contentHistory);

        if (response && response.statusCode === 201) {
            res.status(201).send(result.toJSON());
        } else {

            res.status(500).send({message: 'Unable to create new Content'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

router.get('/getContent/:contentId', async (req, res, next) => {
    try {
        const result = await dao.findContentById(req.params.contentId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'Content not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

router.get('/getContentByProject/:projectId', async (req, res, next) => {
    try {
        const result = await dao.findContentsByProjectId(req.params.projectId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'Contents not found.'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/updateContent/:contentId', userAuth, userProjectRoleMiddleware, async (req, res, next) => {
    if (req.body.content) {
        return updateContent(res, req.params.contentId, req.body, req.headers, req.user.id);
    } else {
        const form = new multiparty.Form();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const content = {
                    projectId: _.get(fields, ['projectId', '0'], undefined),
                    contentName: _.get(fields, ['contentName', '0'], undefined),
                    comment: _.get(fields, ['comment', '0'], undefined)
                };
                if (files.content) {
                    dao.persistFile(files.content[0], persistedFile => {
                        content.content = `http://localhost:3000/contents/getFile/${persistedFile._id}`;

                        return updateContent(res, req.params.contentId, content, req.headers, req.user.id);
                    });
                } else {
                    content.content = _.get(fields, ['content', '0'], undefined);

                    return updateContent(res, req.params.contentId, content, req.headers, req.user.id);
                }
            }
        });
    }
});

async function updateContent(res, contentId, content, headers, userId) {
    try {
        const result = await dao.updateContent(contentId, content);
        const contentHistory = {
            contentId: contentId,
            userId,
            content: result.content,
            comment: result.comment
        };
        headers['Content-Type'] = 'application/json';

        const response = await restTemplate({
            host: 'localhost',
            port: '3000',
            path: '/contentHistory/createContentHistory',
            method: 'POST',
            headers
        }, contentHistory);

        if (response && response.statusCode === 201) {
            res.status(201).send(result.toJSON());
        } else {
            res.status(500).send({message: 'Unable to create new Content'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = router;