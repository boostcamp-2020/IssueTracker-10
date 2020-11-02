const { comment, issue } = require('./database');
const errorMessages = require('../services/errorMessages');

const createComment = async (commentData) => {
  try {
    const { userId, issueId, content } = commentData;
    const issueInfo = issue.findOne({
      where: { id: issueId },
      raw: true,
    });
    if (!issueInfo) return false;
    const commentInfo = (
      await comment.create({
        userId,
        issueId,
        content,
      })
    ).get({ plain: true });
    return commentInfo;
  } catch (err) {
    throw new Error(errorMessages.comment.createFailed);
  }
};

const commentCountById = async (id) => {
  try {
    const commentCount = comment.count({
      where: { id },
    });

    return commentCount;
  } catch (err) {
    throw new Error(errorMessages.comment.notFoundError);
  }
};

module.exports = {
  createComment,
  commentCountById,
};
