const issueModel = require('../models/issue');
const commentModel = require('../models/comment');

const selectIssueById = async (req, res, next) => {
  try {
    const {issueId} = req.params;
    const issueInfo = await issueModel.findIssueById(issueId);
    const commentCount = await commentModel.commentCountById(issueId);

    const data = {
      issueInfo,
      commentCount
    };

    res.status(200).json({message: 'The request is successfully processed', data});
  } catch(err) {
    next(err);
  }
};

module.exports = {
  selectIssueById,
};