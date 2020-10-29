const { issue, user, milestone, label } = require('./database');

const findIssueById = async (id) => {
  try {
    const issueInfo = issue.findOne({
      attributes: ['id', 'title', 'state', 'createdAt'],
      include: [
        {
          model: user,
          as: 'owner',
          attributes: ['id', 'username'],
          required: true,
        },
        {
          model: milestone,
          attributes: ['id', 'title'],
        },
        {
          model: label,
          attributes: ['id', 'title', 'color'],
          through: {
            attributes: [],
          }
        },
        {
          model: user,
          as: 'assignees',
          attributes: ['id', 'username', 'avatar'],
          through: {
            attributes: [],
          }
        },
      ],
      where: {id}
    });

    return issueInfo;
  } catch (err) {
    throw new Error('이슈 데이터 findOne 실패');
  }
};

module.exports = {
  findIssueById,
};
