const { milestone } = require('./database');
const errorMessages = require('../services/errorMessages');

const milestoneType = {
  closed: 0,
  open: 1,
};

const createMilestone = async (milestoneData) => {
  try {
    const {title, description, date} = milestoneData;
    const milestoneInfo = await milestone.create({
      title,
      description,
      date,
      state: milestoneType.open
    });
    return milestoneInfo.get({plain: true});
  } catch (err) {
    throw new Error(errorMessages.milestone.createFailed);
  }
};

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

const deleteMilestoneById = async (milestoneId) => {
  try {
    const result = await milestone.destroy({ where: { id: milestoneId } });
    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(errorMessages.milestone.deleteFailed);
  }
};

module.exports = {
  createMilestone,
  findMilestoneAll,
  deleteMilestoneById,
};
