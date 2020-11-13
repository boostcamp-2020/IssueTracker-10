const { milestone } = require('./database');
const ERROR_MSG = require('../services/errorMessages');

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
    throw new Error(ERROR_MSG.create);
  }
};

const findMilestoneById = async (milestoneId) => {
  try {
    const milestones = await milestone.findOne({
      attributes: ['id', 'title', 'description', 'date', 'state'],
      order: [['id', 'DESC']],
      where: { id: milestoneId },
      raw: true,
    });
    return milestones;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const updateMilestone = async (milestoneData) => {
  try {
    const { title, description, date, milestoneId } = milestoneData;
    const [result] = await milestone.update(
      {
        title,
        description,
        date,
      },
      {
        where: { id: milestoneId },
      },
    );
    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.update);
  }
};

const findMilestoneAll = async () => {
  try {
    const milestones = await milestone.findAll({
      attributes: ['id', 'title'],
      order: [['id', 'DESC']],
    });

    return milestones;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const findMilestoneListByState = async (state = 1) => {
  try {
    const milestones = await milestone.findAll({
      attributes: ['id', 'title', 'description', 'date', 'state'],
      order: [['id', 'DESC']],
      where: { state },
      raw: true,
    });
    return milestones;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const deleteMilestoneById = async (milestoneId) => {
  try {
    const result = await milestone.destroy({ where: { id: milestoneId } });
    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.delete);
  }
};

const updateStateOfMilestone = async (stateData) => {
  try {
    const { state, milestoneId } = stateData;
    const [updatedResult] = await milestone.update({ state }, { where: { id: milestoneId } });
    if (updatedResult) return true;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.update);
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
