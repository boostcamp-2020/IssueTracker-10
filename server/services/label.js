const labelModel = require('../models/label');
const successMessages = require('./successMessages');
const errorMessages = require('./errorMessages');

const checkValidation = {
  create: (labelData) => {
    const { title, description, color } = labelData;
    if (!title && !color) return false;
    if (description && typeof description !== 'string') return false;
    if (color && typeof color !== 'string') return false;
    return true;
  },
};

const createLabel = async (req, res) => {
  try {
    const labelData = req.body;
    if (!checkValidation.create(labelData)) {
      return res.status(400).json({ message: errorMessages.label.invalid });
    }
    const isSuccess = await labelModel.createLabel(labelData);
    if (isSuccess) return res.status(200).json({ message: successMessages.label.create });
    return res.status(409).json({ message: errorMessages.label.alreadyExist });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

const deleteLabel = async (req, res) => {
  try {
    const { labelId } = req.params;
    const isDeleted = await labelModel.deleteLabel(labelId);
    if (isDeleted) return res.status(200).json({ message: successMessages.label.delete });
    return res.status(404).json({ message: errorMessages.label.notFoundError });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

module.exports = {
  createLabel,
  deleteLabel,
};
