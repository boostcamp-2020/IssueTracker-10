const express = require('express');
const multer = require('multer');

const router = express.Router();
const issueRouter = require('./issue');
const milestoneRouter = require('./milestone');
const labelRouter = require('./label');
const commentRouter = require('./comment');
const readInformation = require('../../services');

const uploader = multer({ dest: 'public/upload/' });
const uploadFile = require('../../services/file');

router.get('/all', readInformation);
router.post('/file', uploader.single('file'), uploadFile);
router.use('/issue', issueRouter);
router.use('/milestone', milestoneRouter);
router.use('/label', labelRouter);
router.use('/comment', commentRouter);

module.exports = router;
