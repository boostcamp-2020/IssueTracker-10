const { issue, user, milestone, label } = require('./database');
const errorMessages = require('../services/errorMessages');

const issueType = {
  close: 0,
  open: 1,
};

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
  findIssueById,
  findIssueAll,
  countAllClosedIssues,
  countAllOpenIssues,
};
