const { comment } = require('./database');

const commentCountById = async (id) => {
  try {
    const commentCount = comment.count({
      where: {id}
    });

    return commentCount;
  } catch (err) {
    throw new Error('커맨드 개수 count 실패');
  }
};

module.exports = {
  commentCountById,
};
