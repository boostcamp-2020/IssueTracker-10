const express = require('express');

const router = express.Router();
const issueRouter = require('./issue');

router.use('/issue', issueRouter);

module.exports = router;
