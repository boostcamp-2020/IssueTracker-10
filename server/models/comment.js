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

module.exports = {
  createComment,
};
