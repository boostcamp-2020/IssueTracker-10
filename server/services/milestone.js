const milestoneModel = require('../models/milestone');
const issueModel = require('../models/issue');
const SUCCESS_MSG = require('./successMessages');
const ERROR_MSG = require('./errorMessages');

const checkValidation = {
  createOrUpdate: (milestoneData) => {
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
    if (!checkValidation.createOrUpdate(milestoneData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const { id } = await milestoneModel.createMilestone(milestoneData);
    return res.status(200).json({ message: SUCCESS_MSG.create, id });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const updateMilestone = async (req, res) => {
  try {
    const milestoneData = req.body;
    const { milestoneId } = req.params;
    if (!checkValidation.createOrUpdate(milestoneData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const milestoneInfo = await milestoneModel.findMilestoneById(milestoneId);
    if (!milestoneInfo) {
      return res.status(404).json({ message: ERROR_MSG.notFound });
    }
    const result = await milestoneModel.updateMilestone({ ...milestoneData, milestoneId });
    if (result) return res.status(200).json({ message: SUCCESS_MSG.update });
    return res.status(422).json({ message: ERROR_MSG.update });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const readMilestoneByState = async (req, res) => {
  try {
    const { state = 1 } = req.query;
    const milestones = await milestoneModel.findMilestoneListByState(state);
    const resData = await Promise.all(
      milestones.map(async (msData) => {
        const { id } = msData;
        const issueCount = await issueModel.countIssuesByMilestone(id);
        return { ...msData, ...issueCount };
      }),
    );
    return res.status(200).json({ message: SUCCESS_MSG.read, data: resData });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const readMilestoneById = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const milestoneData = await milestoneModel.findMilestoneById(milestoneId);
    if (!milestoneData) {
      return res.status(404).json({ message: ERROR_MSG.notFound });
    }
    return res.status(200).json({ message: SUCCESS_MSG.read, data: milestoneData });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const deleteMilestone = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const isSuccess = await milestoneModel.deleteMilestoneById(milestoneId);
    if (isSuccess) return res.status(200).json({ message: SUCCESS_MSG.delete });
    return res.status(404).json({ message: ERROR_MSG.notFound });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
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
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const result = await milestoneModel.updateStateOfMilestone(stateData);
    if (result) return res.status(200).json({ message: SUCCESS_MSG.update });
    return res.status(422).json({ message: ERROR_MSG.update });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

module.exports = {
  createMilestone,
  updateMilestone,
  readMilestoneByState,
  readMilestoneById,
  deleteMilestone,
  toggleState,
};
