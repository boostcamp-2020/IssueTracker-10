const { comment, issue, user } = require('./database');
const ERROR_MSG = require('../services/errorMessages');

const findAllCommentByIssueId = async (issueId) => {
  try {
    const commentInfo = await comment.findAll({
      attributes: ['id', 'content', 'createdAt', 'updatedAt'],
      where: { issueId },
      order: ['id'],
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
    throw new Error(ERROR_MSG.notFound);
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
    throw new Error(ERROR_MSG.create);
  }
};

const commentCountById = async (id) => {
  try {
    const commentCount = comment.count({
      where: { id },
    });

    return commentCount;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const deleteCommentById = async (commentId) => {
  try {
    const result = await comment.destroy({ where: { id: commentId } });
    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.delete);
  }
};

const updateComment = async (commentData) => {
  try {
    const { commentId, content } = commentData;
    const [result] = await comment.update(
      {
        content,
      },
      { where: { id: commentId } },
    );

    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.update);
  }
};

module.exports = {
  createComment,
  commentCountById,
  findAllCommentByIssueId,
  deleteCommentById,
  updateComment,
};
