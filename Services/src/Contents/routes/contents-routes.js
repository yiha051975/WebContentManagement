'use strict';
const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const dao = require('../dao/contents-dao');
const _ = require('lodash');
const restTemplate = require('../../utils/rest-template');
const userAuth = require('../../Users/middlewares/user-auth-middleware');
const userProjectRoleMiddleware = require('../../UsersProjectsRoles/middlewares/user-project-role-middleware');

/**
 * @swagger
 * definition:
 *      Content:
 *          properties:
 *              id:
 *                  type: string
 *                  example: 67789f33-95f5-466d-a1d9-b4c1f809d6d8
 *              projectId:
 *                  type: string
 *                  example: 513d644e-47d7-453b-8d6b-18a91446c615
 *              contentName:
 *                  type: string
 *                  example: test_content_2
 *              content:
 *                  type: string
 *                  example: http://localhost:3000/contents/getFile/59bb317b1d1af93d9cfe52f3
 *              comment:
 *                  type: string
 *                  example: This is a test content 2 comment.
 */

/**
 * @swagger
 * /api/contents/getFile/{fileId}:
 *      get:
 *          tags:
 *              - Contents
 *          description: Retrieve the binary data from database
 *          produces:
 *              - application/octet-stream
 *          parameters:
 *              - name: fileId
 *                description: fileId string
 *                in: path
 *                type: string
 *                example: 59bb317b1d1af93d9cfe52f3
 *          responses:
 *              200:
 *                  description: Return an existing file from database
 *                  schema:
 *                      type: file
 *              404:
 *                  description: Unable to locate file from database
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: File not found
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/contents/createContent:
 *      post:
 *          tags:
 *              - Contents
 *          description: Create a new content
 *          consumes:
 *              - multipart/form-data
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: projectId
 *                description: projectId string
 *                in: formData
 *                type: string
 *                required: true
 *                example: 513d644e-47d7-453b-8d6b-18a91446c615
 *              - name: contentName
 *                description: content name that will be used for the client side to append content
 *                in: formData
 *                type: string
 *                required: true,
 *                example: test_content_3
 *              - name: content
 *                description: content that can be a string or a file
 *                in: formData
 *                type: string
 *                required: true
 *                example: This is a test content
 *              - name: comment
 *                description: comment that is for other user to identify the purpose of this content
 *                in: formData
 *                type: string
 *                example: This is a test comment
 *          responses:
 *              201:
 *                  description: Return a newly created Content from database
 *                  schema:
 *                      $ref: '#/definitions/Content'
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/contents/getContent/{contentId}:
 *      get:
 *          tags:
 *              - Contents
 *          description: retrieve existing contents by content id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: contentId
 *                description: contentId string
 *                in: path
 *                type: string
 *                required: true
 *                example: 67789f33-95f5-466d-a1d9-b4c1f809d6d8
 *          responses:
 *              200:
 *                  description: Return all the existing contents that has the project id specified
 *                  schema:
 *                      $ref: '#/definitions/Content'
 *              404:
 *                  description: Content not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Content not found.
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/contents/getContentByProject/{projectId}:
 *      get:
 *          tags:
 *              - Contents
 *          description: retrieve existing contents by project id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: projectId
 *                description: projectId string
 *                in: path
 *                type: string
 *                required: true
 *                example: 513d644e-47d7-453b-8d6b-18a91446c615
 *          responses:
 *              200:
 *                  description: Return all the existing contents that has the project id specified
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/Content'
 *              404:
 *                  description: Content not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Contents not found.
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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

/**
 * @swagger
 * /api/contents/updateContent/{contentId}:
 *      put:
 *          tags:
 *              - Contents
 *          description: retrieve existing contents by project id
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: contentId
 *                description: contentId string
 *                in: path
 *                type: string
 *                required: true
 *                example: 67789f33-95f5-466d-a1d9-b4c1f809d6d8
 *          responses:
 *              200:
 *                  description: Update the existing Content with new content
 *                  schema:
 *                      $ref: '#/definitions/Content'
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
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