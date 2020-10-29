const express = require('express');

const router = express.Router();
const { createIssue } = require('../../services/issue');
const issueService = require('../../services/issue');

router.post('/', createIssue);

router.get('/:issueId', issueService.selectIssueById);
router.delete('/:issueId', issueService.deleteIssue);

module.exports = router;
