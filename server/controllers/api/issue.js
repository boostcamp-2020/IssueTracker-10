const express = require('express');

const router = express.Router();
const issueService = require('../../services/issue');
const commentService = require('../../services/comment');

router.get('/', issueService.readIssueAll);
router.post('/', issueService.createIssue);
router.get('/:issueId', issueService.readIssueById);
router.put('/state', issueService.toggleState);
router.put('/:issueId', issueService.updateIssueTitle);
router.delete('/:issueId', issueService.deleteIssue);
router.post('/:issueId/details', issueService.updateIssueDetail);

router.get('/:issueId/comment', commentService.readCommentAll);
router.post('/:issueId/comment', commentService.createComment);

module.exports = router;
