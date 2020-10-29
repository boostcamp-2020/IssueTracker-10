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

const findIssueClosed = async () => {
  try {
    const issues = await issue.findAll({
      attributes: ['id', 'title', 'state', 'author', 'createdAt', 'updatedAt'],
      where: { state: issueType.close },
    });

    return issues;
  } catch (err) {
    throw new Error(errorMessages.issue.notFoundError);
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
    throw new Error(errorMessages.issue.notFoundError);
  }
};

module.exports = {
  findIssueAll,
  findIssueClosed,
  findIssueOpen,
};
