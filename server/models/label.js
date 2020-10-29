const { label } = require('./database');

const findLabelAll = async () => {
  try {
    const labels = await label.findAll({
      attributes: ['id', 'title', 'description', 'color'],
    });

    return labels;
  } catch (err) {
    throw new Error('모든 label 찾기 실패');
  }
};

module.exports = findLabelAll;
