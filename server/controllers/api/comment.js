const express = require('express');

const router = express.Router();
const commentService = require('../../services/comment');

router.delete('/:commentId', commentService.deleteComment);

module.exports = router;
