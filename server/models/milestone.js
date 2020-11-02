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
  findMilestoneAll,
  deleteMilestoneById,
};
