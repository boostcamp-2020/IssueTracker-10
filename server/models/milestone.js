const { milestone } = require('./database');
const errorMessages = require('../services/errorMessages');

const milestoneType = {
  closed: 0,
  open: 1,
};

const createMilestone = async (milestoneData) => {
  try {
    const { title, description, date } = milestoneData;
    const milestoneInfo = await milestone.create({
      title,
      description,
      date,
      state: milestoneType.open,
    });
    return milestoneInfo.get({ plain: true });
  } catch (err) {
    throw new Error(errorMessages.milestone.createFailed);
  }
};

const findMilestoneById = async (milestoneId) => {
  try {
    const milestones = await milestone.findOne({
      attributes: ['id', 'title', 'description', 'date', 'state'],
      where: { id: milestoneId },
      raw: true,
    });
    return milestones;
  } catch (err) {
    throw new Error(errorMessages.milestone.notFoundError);
  }
};

const updateMilestone = async (milestoneData) => {
  try {
    const { title, description, date, milestoneId } = milestoneData;
    const [result] = await milestone.update({
      title,
      description,
      date,
    }, {
      where: { id: milestoneId },
    });
    if(result) return true;
    return false;
  } catch (err) {
    throw new Error(errorMessages.milestone.updateFailed);
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
  createMilestone,
  findMilestoneById,
  updateMilestone,
  findMilestoneAll,
  findMilestoneListByState,
  deleteMilestoneById,
  updateStateOfMilestone,
};