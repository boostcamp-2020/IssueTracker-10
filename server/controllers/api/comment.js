const express = require('express');

const router = express.Router();
const commentService = require('../../services/comment');

router.put('/:commentId', commentService.updateComment);

module.exports = router;
