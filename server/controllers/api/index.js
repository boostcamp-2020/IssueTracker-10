const express = require('express');

const router = express.Router();
const issueRouter = require('./issue');
const findAllIssues = require('../../services');

router.get('/all', findAllIssues);
router.use('/issue', issueRouter);

module.exports = router;
