'use strict';
const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const dao = require('../dao/contents-dao');

/*router.post('/uploadFile', (req, res, next) => {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        dao.persistFile(files.files[0], persistedFile => {
            res.send(persistedFile);
        });
    });
});*/

router.get('/getFile/:fileId', (req, res, next) => {
    const readStream = dao.retrieveFile(req.params.fileId);

    dao.retrieveFileMeta(req.params.fileId, (err, file) => {
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `inline; filename=${file.filename}`);
        readStream.pipe(res);
    });
});

router.post('/createContent', (req, res, next) => {
    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const content = {
                projectId: fields.projectId[0]
            };
            if (files.content) {
                dao.persistFile(files.content[0], async persistedFile => {
                    content.content = `http://localhost:3000/contents/getFile/${persistedFile._id}`;

                    try {
                        const result = await dao.createNewContent(content);
                        res.status(201).send(result);
                    } catch(error) {
                        res.status(500).send(error);
                    }
                });
            } else {
                try {
                    content.content = fields.content[0];
                    const result = await dao.createNewContent(content);
                    res.status(201).send(result);
                } catch (error) {
                    res.status(500).send(error);
                }
            }
        }
    });
});

module.exports = router;