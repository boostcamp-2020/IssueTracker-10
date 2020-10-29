const issueModel = require('../models/issue');
const commentModel = require('../models/comment');
const successMessages = require('./successMessages');
const errorMessages = require("./errorMessages");

const checkValidation = {
  create: (issueData) => {
    const { title, content, labels, assignees, milestone } = issueData;
    if (!title) return false;
    if (content && typeof content !== 'string') return false;
    if (labels && !Array.isArray(labels)) return false;
    if (assignees && !Array.isArray(assignees)) return false;
    if (milestone && !Array.isArray(milestone)) return false;
    return true;
  },
  updateTitle: (issueData) => {
    const { title } = issueData;
    if(title) return false;
    return true;
  }
};

const createIssue = async (req, res) => {
  try {
    const issueData = req.body;
    const { id } = req.user;
    if (!checkValidation.create(issueData)) {
      return res.status(400).json({ message: '' });
    }

    const { content } = issueData;
    const { id: issueId } = await issueModel.createIssue({ ...issueData, userId: id });
    await commentModel.createComment({ userId: id, issueId, content });
    return res.status(200).json({ message: '' });
  } catch (err) {
    return res.status(500).json({ message: '' });
  }
};

const selectIssueById = async (req, res, next) => {
  try {
    const { issueId } = req.params;
    const issueInfo = await issueModel.findIssueById(issueId);
    const commentCount = await commentModel.commentCountById(issueId);

    const data = {
      issueInfo,
      commentCount,
    };

    res.status(200).json({ message: 'The request is successfully processed', data });
  } catch (err) {
    next(err);
  }
};

const updateIssueTitle = async (req, res, next) => {
  try {
    const issueData = req.body;
    const { issueId } = req.params;
    const { id: userId } = req.user;

    if (checkValidation.updateTitle(issueData)) {
      return res.status(400).json({ message: errorMessages.issue.noRequestData });
    }

    const result = await issueModel.compareAuthor(userId, issueId);

    if(!result) {
      return res.status(403).json({message: errorMessages.issue.notAuthor});
    }

    const { title } = issueData;
    const [updateResult] = await issueModel.updateIssueTitle(issueId, title);

    if(updateResult) return res.status(200).json({message: successMessages.issue.update});

    return res.status(500).json({message: errorMessages.issue.updateFailed});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createIssue,
  selectIssueById,
  updateIssueTitle,
};
