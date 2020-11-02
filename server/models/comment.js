const { comment, issue, user } = require('./database');
const errorMessages = require('../services/errorMessages');

const findAllCommentByIssueId = async (issueId) => {
  try {
    const commentInfo = await comment.findAll({
      attributes: ['id', 'content', 'createdAt', 'updatedAt'],
      where: { issueId },
      include: [
        {
          model: user,
          attributes: ['id', 'username', 'avatar'],
          require: true,
        },
      ],
    });
    if (!commentInfo.length) return false;
    return commentInfo;
  } catch (err) {
    throw new Error(errorMessages.comment.notFoundError);
  }
};

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
  findAllCommentByIssueId,
};
