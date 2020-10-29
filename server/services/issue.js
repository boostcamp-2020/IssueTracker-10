const issueModel = require('../models/issue');

const selectIssueById = async (req, res, next) => {
  try {
    const {issueId} = req.params;
    const issueInfo = await issueModel.findIssueById(issueId);

    res.status(200).json({message: 'The request is successfully processed', data: issueInfo});
  } catch(err) {
    next(err);
  }
};

module.exports = {
  selectIssueById,
};