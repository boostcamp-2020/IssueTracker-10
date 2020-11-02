const milestoneModel = require('../models/milestone');
const errorMessages = require('./errorMessages');
const successMessages = require('./successMessages');

const deleteMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const isSuccess = await milestoneModel.deleteMilestoneById(milestoneId);
    if (isSuccess) return res.status(200).json({ message: successMessages.milestone.delete });
    return res.status(404).json({ message: errorMessages.milestone.notFoundError });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

module.exports = {
  deleteMilestone,
};
