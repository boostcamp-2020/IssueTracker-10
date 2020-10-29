const express = require('express');

const router = express.Router();
const issueRouter = require('./issue');
const findAllIssues = require('../../services');

router.use('/issue', issueRouter);
router.get('/all', findAllIssues);

module.exports = router;
