const labelModel = require('../models/label');
const SUCCESS_MSG = require('./successMessages');
const ERROR_MSG = require('./errorMessages');

const checkValidation = {
  createOrUpdate: (labelData) => {
    const { title, description, color } = labelData;
    if (!title || !color) return false;
    if (description && typeof description !== 'string') return false;
    if (typeof color !== 'string') return false;
    return true;
  },
};

const readLabelAll = async (req, res) => {
  try {
    const labelData = await labelModel.findLabelAll();
    return res.status(200).json({ message: SUCCESS_MSG.read, data: labelData });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const createLabel = async (req, res) => {
  try {
    const labelData = req.body;
    if (!checkValidation.createOrUpdate(labelData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const isSuccess = await labelModel.createLabel(labelData);
    if (isSuccess) return res.status(200).json({ message: SUCCESS_MSG.create });
    return res.status(409).json({ message: ERROR_MSG.already });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const updateLabel = async (req, res) => {
  try {
    const labelData = req.body;
    const { labelId } = req.params;
    if (!checkValidation.createOrUpdate(labelData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const result = await labelModel.updateLabel({ ...labelData, labelId });
    if (result) return res.status(200).json({ message: SUCCESS_MSG.update });
    return res.status(404).json({ message: ERROR_MSG.notFound });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const deleteLabel = async (req, res) => {
  try {
    const { labelId } = req.params;
    const isDeleted = await labelModel.deleteLabel(labelId);
    if (isDeleted) return res.status(200).json({ message: SUCCESS_MSG.delete });
    return res.status(404).json({ message: ERROR_MSG.notFound });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

module.exports = {
  createLabel,
  updateLabel,
  deleteLabel,
  readLabelAll,
};
