const express = require('express');

const router = express.Router();
const issueService = require('../../services/issue');

router.post('/', issueService.createIssue);
router.get('/:issueId', issueService.selectIssueById);
router.put('/state', issueService.toggleState);

module.exports = router;
