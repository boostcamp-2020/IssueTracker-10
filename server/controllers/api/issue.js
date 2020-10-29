const express = require('express');

const router = express.Router();
const { createIssue, selectIssueById, updateIssueTitle } = require('../../services/issue');

router.post('/', createIssue);

router.get('/:issueId', selectIssueById);

router.put('/:issueId', updateIssueTitle);

module.exports = router;
