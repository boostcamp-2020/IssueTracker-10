const express = require('express');

const router = express.Router();
const issueRouter = require('./issue');
const milestoneRouter = require('./milestone');
const findAllIssues = require('../../services');

router.get('/all', findAllIssues);
router.use('/issue', issueRouter);
router.use('/milestone', milestoneRouter);

module.exports = router;
