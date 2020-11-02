
const milestoneModel = require('../models/milestone');
const { countIssuesByMilestone } = require('../models/issue');
const successMessages = require('./successMessages');
const errorMessages = require('./errorMessages');

const checkValidation = {
  create: (milestoneData) => {
    const { title, description, date } = milestoneData;
    if (!title) return false;
    if (description && typeof description !== 'string') return false;
    if (date && isNaN(Date.parse(date))) return false;
    return true;
  },
  toggle: (stateData) => {
    const { state } = stateData;
    if (state !== 0 && state !== 1) return false;
    return true;
  },
};

const createMilestone = async (req, res) => {
  try {
    const milestoneData = req.body;
    if (!checkValidation.create(milestoneData)) {
      return res.status(400).json({ message: errorMessages.milestone.invalid });
    }
    await milestoneModel.createMilestone(milestoneData);
    return res.status(200).json({ message: successMessages.milestone.create });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

const selectMilestoneList = async (req, res) => {
  try {
    const { state = 1 } = req.query;
    const milestones = await milestoneModel.findMilestoneList(state);
    const resData = await Promise.all(
      milestones.map(async (msData) => {
        const { id } = msData;
        const issueCount = await countIssuesByMilestone(id);
        return { ...msData, ...issueCount };
      }),
    );
    return res.status(200).json({ message: successMessages.milestone.read, data: resData });
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
  createMilestone,
  selectMilestoneList,
  deleteMilestone,
  toggleState,
};
