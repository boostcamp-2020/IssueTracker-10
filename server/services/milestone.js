const milestoneModel = require('../models/milestone');
const errorMessages = require('./errorMessages');
const successMessages = require('./successMessages');

const checkValidation = {
  create: (milestoneData) => {
    const { title, description, date } = milestoneData;
    if (!title) return false;
    if (description && typeof description !== 'string') return false;
    if (date && isNaN(Date.parse(date))) return false;
    return true;
  },
};

const createMilestone = async (req, res) => {
  try {
    const milestoneData = req.body;
    if (!checkValidation.create(milestoneData)) {
      return res.status(400).json({ message: errorMessages.issue.invalid });
    }
    await milestoneModel.createMilestone(milestoneData);
    return res.status(200).json({ message: successMessages.milestone.create });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

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
  createMilestone,
  deleteMilestone,
};
