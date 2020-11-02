const { milestone } = require('./database');
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

const findMilestoneListByState = async (state = 1) => {
  try {
    const milestones = await milestone.findAll({
      attributes: ['id', 'title', 'description', 'date', 'state'],
      where: { state },
      raw: true,
    });
    return milestones;
  } catch (err) {
    throw new Error(errorMessages.milestone.notFoundError);
  }
};

module.exports = {
  findMilestoneAll,
  findMilestoneListByState,
};
