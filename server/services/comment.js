const commentModel = require('../models/comment');
const successMessages = require('./successMessages');
const errorMessages = require('./errorMessages');

const checkValidation = {
  create: (commentData) => {
    const { content } = commentData;
    if (!content) return false;
    return true;
  },
};

const createComment = async (req, res) => {
  try {
    const commentData = req.body;
    const { issueId } = req.params;
    const { id } = req.user;
    if (!checkValidation.create(commentData)) {
      return res.status(400).json({ message: errorMessages.comment.invalid });
    }
    const { content } = commentData;
    const commentInfo = await commentModel.createComment({ content, userId: id, issueId });
    if (!commentInfo) return res.status(404).json({ message: errorMessages.issue.notFoundError });
    return res.status(200).json({ message: successMessages.comment.create });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

module.exports = {
  createComment,
};
