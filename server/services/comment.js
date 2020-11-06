const commentModel = require('../models/comment');
const SUCCESS_MSG = require('./successMessages');
const ERROR_MSG = require('./errorMessages');

const checkValidation = {
  createOrUpdate: (commentData) => {
    const { content } = commentData;
    if (!content) return false;
    return true;
  },
};

const readCommentAll = async (req, res) => {
  try {
    const { issueId } = req.params;
    const commentInfo = await commentModel.findAllCommentByIssueId(issueId);
    if (!commentInfo) return res.status(404).json({ message: ERROR_MSG.notFoundError });
    return res.status(200).json({ message: SUCCESS_MSG.read, data: commentInfo });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const createComment = async (req, res) => {
  try {
    const commentData = req.body;
    const { issueId } = req.params;
    const { id } = req.user;
    if (!checkValidation.createOrUpdate(commentData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const { content } = commentData;
    const commentInfo = await commentModel.createComment({ content, userId: id, issueId });
    if (!commentInfo) return res.status(404).json({ message: ERROR_MSG.notFound });
    return res.status(200).json({ message: SUCCESS_MSG.create });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const isSuccess = await commentModel.deleteCommentById(commentId);
    if (isSuccess) return res.status(200).json({ message: SUCCESS_MSG.delete });
    return res.status(404).json({ message: ERROR_MSG.notFound });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const updateComment = async (req, res) => {
  try {
    const commentData = req.body;
    const { commentId } = req.params;
    if (!checkValidation.createOrUpdate(commentData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const result = await commentModel.updateComment({ ...commentData, commentId });
    if (result) return res.status(200).json({ message: SUCCESS_MSG.update });
    return res.status(404).json({ message: ERROR_MSG.notFound });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

module.exports = {
  readCommentAll,
  createComment,
  deleteComment,
  updateComment,
};
