const { issue, user } = require('./database');
const errorMessages = require('../services/errorMessages');

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
    throw new Error(errorMessages.issue.notFoundError);
  }
};

const countAllClosedIssues = async () => {
  try {
    const closedCount = await issue.count({ where: { state: issueType.close } });

    return closedCount;
  } catch (err) {
    throw new Error(errorMessages.issue.notFoundError);
  }
};

const countAllOpenIssues = async () => {
  try {
    const openCount = await issue.count({ where: { state: issueType.open } });

    return openCount;
  } catch (err) {
    throw new Error(errorMessages.issue.notFoundError);
  }
};

module.exports = {
  findIssueAll,
  countAllClosedIssues,
  countAllOpenIssues,
};
