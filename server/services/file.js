const SUCCESS_MSG = require('./successMessages');
const ERROR_MSG = require('./errorMessages');

const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).json({ message: ERROR_MSG.invalid });
    const filePath = process.env.BASE_URL + file.filename;
    return res.status(200).json({ message: SUCCESS_MSG.create, data: filePath });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

module.exports = uploadFile;
