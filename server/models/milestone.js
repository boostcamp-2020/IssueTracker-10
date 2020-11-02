const { milestone } = require('./database');
const { countIssuesByMilestone } = require('./issue');
const errorMessages = require('../services/errorMessages');

const findMilestoneAll = async () => {
  try {
    const milestones = await milestone.findAll({
      attributes: ['id', 'title'],
    });

    return milestones;
  } catch (err) {
    throw new Error(errorMessages.milestone.notFoundError);
  }
};

const findMilestoneList = async () => {
  try {
    const milestones = await milestone.findAll({
      attributes: ['id', 'title', 'description', 'date', 'state'],
      raw: true,
    });
    return milestones;
  } catch (err) {
    throw new Error(errorMessages.milestone.notFoundError);
  }
};

module.exports = {
  findMilestoneAll,
  findMilestoneList,
};
