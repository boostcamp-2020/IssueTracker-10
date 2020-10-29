const { label } = require('./database');
const errorMessages = require('../services/errorMessages');

const findLabelAll = async () => {
  try {
    const labels = await label.findAll({
      attributes: ['id', 'title', 'description', 'color'],
    });

    return labels;
  } catch (err) {
    throw new Error(errorMessages.label.notFoundError);
  }
};

module.exports = findLabelAll;
