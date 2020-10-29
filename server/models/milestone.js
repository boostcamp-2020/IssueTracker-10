const { milestone } = require('./database');

const findMilestoneAll = async () => {
  try {
    const milestones = await milestone.findAll({
      attributes: ['id', 'title'],
    });

    return milestones;
  } catch (err) {
    throw new Error('모든 milestone 찾기 실패');
  }
};

module.exports = findMilestoneAll;
