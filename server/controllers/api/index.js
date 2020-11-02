const express = require('express');

const router = express.Router();
const issueRouter = require('./issue');
const milestoneRouter = require('./milestone');
const labelRouter = require('./label');
const findAllIssues = require('../../services');

router.get('/all', findAllIssues);
router.use('/issue', issueRouter);
router.use('/milestone', milestoneRouter);
router.use('/label', labelRouter);

module.exports = router;
