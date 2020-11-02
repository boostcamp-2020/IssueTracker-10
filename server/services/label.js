const labelModel = require('../models/label');
const successMessages = require('./successMessages');
const errorMessages = require('./errorMessages');

const checkValidation = {
  createOrUpdate: (labelData) => {
    const { title, description, color } = labelData;
    if (!title || !color) return false;
    if (description && typeof description !== 'string') return false;
    if (typeof color !== 'string') return false;
    return true;
  },
};

const createLabel = async (req, res) => {
  try {
    const labelData = req.body;
    if (!checkValidation.createOrUpdate(labelData)) {
      return res.status(400).json({ message: errorMessages.label.invalid });
    }
    const isSuccess = await labelModel.createLabel(labelData);
    if (isSuccess) return res.status(200).json({ message: successMessages.label.create });
    return res.status(409).json({ message: errorMessages.label.alreadyExist });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

const updateLabel = async (req, res) => {
  try {
    const labelData = req.body;
    const { labelId } = req.params;
    if (!checkValidation.createOrUpdate(labelData)) {
      return res.status(400).json({ message: errorMessages.label.invalid });
    }
    const result = await labelModel.updateLabel({ ...labelData, labelId });
    if (result) return res.status(200).json({ message: successMessages.label.update });
    return res.status(404).json({ message: errorMessages.label.notFoundError });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

module.exports = {
  createLabel,
  updateLabel,
};
