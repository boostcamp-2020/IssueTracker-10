const { issue, user } = require('./database');

const issueType = {
  close: 0,
  open: 1,
};

const findIssueAll = async () => {
  try {
    const issues = await issue.findAll({
      attributes: ['id', 'title', 'state', 'createdAt', 'updatedAt'],
      include: [
        {
          model: user,
          attributes: ['id', 'username', 'avatar'],
          require: true,
        },
      ],
    });

    return issues;
  } catch (err) {
    throw new Error('유저 데이터 find 실패');
  }
};

const findIssueClosed = async () => {
  try {
    const issues = await issue.findAll({
      attributes: ['id', 'title', 'state', 'author', 'createdAt', 'updatedAt'],
      where: { state: issueType.close },
    });

    return issues;
  } catch (err) {
    throw new Error('유저 데이터 find 실패');
  }
};

const findIssueOpen = async () => {
  try {
    const issues = await issue.findAll({
      attributes: ['id', 'title', 'state', 'author', 'createdAt', 'updatedAt'],
      where: { state: issueType.open },
    });

    return issues;
  } catch (err) {
    throw new Error('유저 데이터 find 실패');
  }
};

module.exports = {
  findIssueAll,
  findIssueClosed,
  findIssueOpen,
};
