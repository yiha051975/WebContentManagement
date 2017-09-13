'use strict';
const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const dao = require('../dao/contents-dao');
const _ = require('lodash');

router.get('/getFile/:fileId', (req, res, next) => {
    const readStream = dao.retrieveFile(req.params.fileId);

    dao.retrieveFileMeta(req.params.fileId, (err, file) => {
        if (err) {
            res.status(500).send(err);
        } else if (!file) {
            res.status(404).send({message: 'File not found.'});
        } else {
            res.set('Content-Type', file.contentType);
            res.set('Content-Disposition', `inline; filename=${file.filename}`);
            readStream.pipe(res);
        }
    });
});

router.post('/createContent', async (req, res, next) => {
    if (req.body.content) {
        return saveNewContent(res, req.body);
    } else {
        const form = new multiparty.Form();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const content = {
                    projectId: fields.projectId[0],
                    contentName: fields.contentName[0]
                };
                if (files.content) {
                    dao.persistFile(files.content[0], persistedFile => {
                        content.content = `http://localhost:3000/contents/getFile/${persistedFile._id}`;

                        return saveNewContent(res, content);
                    });
                } else {
                    content.content = _.get(fields, ['content', '0'], undefined);

                    return saveNewContent(res, content);
                }
            }
        });
    }
});

async function saveNewContent(res, content) {
    try {
        const result = await dao.createNewContent(content);
        res.status(201).send(result);
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

router.put('/updateContent/:contentId', async (req, res, next) => {

});

module.exports = router;