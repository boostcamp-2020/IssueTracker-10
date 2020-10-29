const { findIssueOpen, findIssueClosed } = require('../models/issue');
const findLabelAll = require('../models/label');
const findMilestoneAll = require('../models/milestone');
const { findUserAll } = require('../models/user');

const findAllIssues = async (req, res, next) => {
  try {
    const openIssue = await findIssueOpen();
    const closedIssue = await findIssueClosed();
    const openCount = [...openIssue].length;
    const closedCount = [...closedIssue].length;
    const users = await findUserAll();
    const labels = await findLabelAll();
    const milestones = await findMilestoneAll();
    const AllIssueInfo = {
      openCount,
      closedCount,
      users,
      labels,
      milestones,
    };
    return res
      .status(200)
      .json({ message: 'The request is successfully processed', data: AllIssueInfo });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = findAllIssues;
