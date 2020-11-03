const express = require('express');

const router = express.Router();
const issueRouter = require('./issue');
const milestoneRouter = require('./milestone');
const labelRouter = require('./label');
const commentRouter = require('./comment');
const readInformation = require('../../services');

router.get('/all', readInformation);
router.use('/issue', issueRouter);
router.use('/milestone', milestoneRouter);
router.use('/label', labelRouter);
router.use('/comment', commentRouter);

module.exports = router;
