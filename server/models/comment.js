const { comment } = require('./database');

const createComment = async (commentData) => {
  try {
    const { userId, issueId, content } = commentData;
    const commentInfo = (
      await comment.create({
        userId,
        issueId,
        content,
      })
    ).get({ plain: true });
    return commentInfo;
  } catch (err) {
    throw new Error('Error on creating an issue');
  }
};

const commentCountById = async (id) => {
  try {
    const commentCount = comment.count({
      where: { id },
    });

    return commentCount;
  } catch (err) {
    throw new Error('커맨드 개수 count 실패');
  }
};

module.exports = {
  createComment,
  commentCountById,
};
