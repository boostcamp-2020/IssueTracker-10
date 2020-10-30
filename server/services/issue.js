const issueModel = require('../models/issue');
const commentModel = require('../models/comment');
const successMessages = require('./successMessages');
const errorMessages = require('./errorMessages');

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
  },
  toggle: (stateData) => {
    const { state, issueIds } = stateData;
    if (state !== 0 && state !== 1) return false;
    if (!Array.isArray(issueIds) || issueIds.length === 0) return false;
    return true;
  },
};

const createIssue = async (req, res) => {
  try {
    const issueData = req.body;
    const { id } = req.user;
    if (!checkValidation.create(issueData)) {
      return res.status(400).json({ message: errorMessages.issue.invalid });
    }

    const { content } = issueData;
    const { id: issueId } = await issueModel.createIssue({ ...issueData, userId: id });
    await commentModel.createComment({ userId: id, issueId, content });
    return res.status(200).json({ message: successMessages.issue.create });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const isSuccess = await issueModel.deleteIssueById(issueId);
    if (isSuccess) return res.status(200).json({ message: successMessages.issue.delete });
    return res.status(404).json({ message: errorMessages.issue.notFoundError });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

const selectIssueById = async (req, res) => {
  try {
    const { issueId } = req.params;
    const {dataValues: issueInfo} = await issueModel.findIssueById(issueId);

    if(!issueInfo) {
      return res.status(404).json({ message: errorMessages.issue.notFoundError });
    }
    
    const commentCount = await commentModel.commentCountById(issueId);

    issueInfo.commentCount = commentCount;

    return res.status(200).json({ message: successMessages.issue.read, data: issueInfo });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

const updateIssueTitle = async (req, res) => {
  try {
    const issueData = req.body;
    const { issueId } = req.params;
    const { id: userId } = req.user;

    if (checkValidation.updateTitle(issueData)) {
      return res.status(400).json({ message: errorMessages.issue.noRequestData });
    }

    const issueInfo = await issueModel.findIssueById(issueId);
    if(!issueInfo) {
      return res.status(404).json({ message: errorMessages.issue.notFoundError });
    }

    const result = await issueModel.compareAuthor(userId, issueId);
    if(!result) {
      return res.status(403).json({message: errorMessages.issue.notAuthor});
    }

    const { title } = issueData;
    const [updateResult] = await issueModel.updateIssueTitle(issueId, title);

    if(updateResult) return res.status(200).json({message: successMessages.issue.update});
    return res.status(422).json({message: errorMessages.issue.updateFailed});
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

const toggleState = async (req, res) => {
  try {
    const stateData = req.body;
    if (!checkValidation.toggle(stateData)) {
      return res.status(400).json({ message: errorMessages.issue.invalid });
    }
    const result = await issueModel.updateStateOfIssues(stateData);
    if (result) return res.status(200).json({ message: successMessages.issue.update });
    return res.status(422).json({ message: errorMessages.issue.update });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

module.exports = {
  createIssue,
  selectIssueById,
  updateIssueTitle,
  toggleState,
  deleteIssue,
};
