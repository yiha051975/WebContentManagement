'use strict';
const express = require('express');
const router = express.Router();
const dao = require('../dao/content-history-dao');

/**
 * @swagger
 * definition:
 *      ContentHistory:
 *          properties:
 *              id:
 *                  type: string
 *                  example: d55b272a-69c1-4a09-8fc3-3c05b3483065
 *              contentId:
 *                  type: string
 *                  example: 6b38657f-402f-4f33-88d8-4986ff1948fa
 *              userId:
 *                  type: string
 *                  example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *              content:
 *                  type: string
 *                  example: http://localhost:3000/contents/getFile/59bb317b1d1af93d9cfe52f3
 *              comment:
 *                  type: string
 *                  example: This is a test content 2 comment.
 *              updatedTime:
 *                  type: date
 *                  example: 2017-09-13T23:56:22.226Z
 */

/**
 * @swagger
 * /api/contentHistories/createContentHistory:
 *      post:
 *          tags:
 *              - Content Histories
 *          description: Create a new Content History
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: contentHistory
 *                description: content history object
 *                in: body
 *                type: application/json
 *                schema:
 *                      properties:
 *                          contentId:
 *                              type: string
 *                              example: 6b38657f-402f-4f33-88d8-4986ff1948fa
 *                          userId:
 *                              type: string
 *                              example: 82484b39-93bc-4151-a2f1-0dc7d120a032
 *                          content:
 *                              type: string
 *                              example: http://localhost:3000/contents/getFile/59bb317b1d1af93d9cfe52f3
 *                          comment:
 *                              type: string
 *                              example: This is a test content 2 comment
 *          responses:
 *              200:
 *                  description: Return all the existing content histories that have the specified content id
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/ContentHistory'
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.post('/createContentHistory', async (req, res, next) => {
    try {
        const result = await dao.createContentHistory(req.body);
        res.status(201).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/contentHistories/getContentHistory/{contentId}:
 *      get:
 *          tags:
 *              - Content Histories
 *          description: retrieve existing contentHistories by contentId
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
 *                  description: Return all the existing content histories that have the specified content id
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/ContentHistory'
 *              404:
 *                  description: Content Histories not found
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Content Histories not found.
 *              500:
 *                  description: Server side error.
 *                  schema:
 *                      properties:
 *                          message:
 *                              type: string
 */
router.get('/getContentHistory/:contentId', async (req, res, next) => {
    try {
        const result = await dao.getCotentHistoryByContentId(req.params.contentId);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({message: 'Content History not found.'});
        }
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;