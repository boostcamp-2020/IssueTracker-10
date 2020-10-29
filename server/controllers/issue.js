const express = require('express');

const router = express.Router();

const issueService = require('../services/issue');
const authenticateJwt = require('../middlewares/authenticateJwt');

router.get('/:issueId', issueService.selectIssueById);

module.exports = router;
