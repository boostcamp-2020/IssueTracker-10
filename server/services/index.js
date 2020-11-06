const issueModel = require('../models/issue');
const milestoneModel = require('../models/milestone');
const userModel = require('../models/user');
const labelModel = require('../models/label');
const SUCCESS_MSG = require('./successMessages');
const ERROR_MSG = require('./errorMessages');

const readInformation = async (req, res) => {
  try {
    const closedCount = await issueModel.countAllClosedIssues();
    const openCount = await issueModel.countAllOpenIssues();
    const users = await userModel.findUserAll();
    const labels = await labelModel.findLabelAll();
    const milestones = await milestoneModel.findMilestoneAll();
    const AllIssueInfo = {
      openCount,
      closedCount,
      users,
      labels,
      milestones,
    };
    return res.status(200).json({ message: SUCCESS_MSG.read, data: AllIssueInfo });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

module.exports = readInformation;
