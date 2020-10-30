const { countAllClosedIssues, countAllOpenIssues } = require('../models/issue');
const findLabelAll = require('../models/label');
const findMilestoneAll = require('../models/milestone');
const { findUserAll } = require('../models/user');
const successMessages = require('./successMessages');

const findAllIssues = async (req, res, next) => {
  try {
    const closedCount = await countAllClosedIssues();
    const openCount = await countAllOpenIssues();
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
    return res.status(200).json({ message: successMessages.issue.read, data: AllIssueInfo });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = findAllIssues;
