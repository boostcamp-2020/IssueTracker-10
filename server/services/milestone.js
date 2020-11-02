const milestoneModel = require('../models/milestone');
const errorMessages = require('./errorMessages');
const successMessages = require('./successMessages');

const checkValidation = {
  toggle: (stateData) => {
    const { state } = stateData;
    if (state !== 0 && state !== 1) return false;
    return true;
  },
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

const toggleState = async (req, res) => {
  try {
    const { state } = req.body;
    const { milestoneId } = req.params;
    const stateData = {
      state,
      milestoneId,
    };
    if (!checkValidation.toggle(stateData)) {
      return res.status(400).json({ message: errorMessages.milestone.invalid });
    }
    const result = await milestoneModel.updateStateOfMilestone(stateData);
    if (result) return res.status(200).json({ message: successMessages.milestone.update });
    return res.status(422).json({ message: errorMessages.milestone.updateFailed });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

module.exports = {
  deleteMilestone,
  toggleState,
};
