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

const deleteMilestoneById = async (milestoneId) => {
  try {
    const result = await milestone.destroy({ where: { id: milestoneId } });
    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(errorMessages.milestone.deleteFailed);
  }
};

const updateStateOfMilestone = async (stateData) => {
  try {
    const { state, milestoneId } = stateData;
    const [updatedResult] = await milestone.update({ state }, { where: { id: milestoneId } });
    if (updatedResult) return true;
    return false;
  } catch (err) {
    throw new Error(errorMessages.milestone.updateFailed);
  }
};

module.exports = {
  findMilestoneAll,
  findMilestoneListByState,
  deleteMilestoneById,
  updateStateOfMilestone,
};
