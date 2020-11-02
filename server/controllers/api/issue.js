const express = require('express');

const router = express.Router();
const issueService = require('../../services/issue');
const commentService = require('../../services/comment');

router.post('/', issueService.createIssue);
router.get('/:issueId', issueService.selectIssueById);
router.put('/state', issueService.toggleState);
router.put('/:issueId', issueService.updateIssueTitle);
router.delete('/:issueId', issueService.deleteIssue);

router.get('/:issueId/comment', commentService.selectAllComments);
router.post('/:issueId/comment', commentService.createComment);

module.exports = router;
