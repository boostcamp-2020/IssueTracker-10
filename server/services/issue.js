const issueModel = require('../models/issue');
const commentModel = require('../models/comment');
const SUCCESS_MSG = require('./successMessages');
const ERROR_MSG = require('./errorMessages');

const checkValidation = {
  create: (issueData) => {
    const { title, content, labels, assignees, milestoneId } = issueData;
    if (!title) return false;
    if (content && typeof content !== 'string') return false;
    if (labels && !Array.isArray(labels)) return false;
    if (assignees && !Array.isArray(assignees)) return false;
    if (milestoneId && typeof milestoneId !== 'number') return false;
    return true;
  },
  updateTitle: (issueData) => {
    const { title } = issueData;
    if (title) return false;
    return true;
  },
  updateDetail: (detailData) => {
    const { type, method, data } = detailData;
    if (!type || !data) return false;
    if (method !== 0 && method !== 1) return false;
    if (typeof data !== 'number') return false;
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
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }

    const { content } = issueData;
    const createdData = await issueModel.createIssue({ ...issueData, userId: id });
    if (!createdData) return res.status(400).json({ message: ERROR_MSG.delete });
    const { id: issueId } = createdData;
    await commentModel.createComment({ userId: id, issueId, content });
    return res.status(200).json({ message: SUCCESS_MSG.create, id: createdData.id });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const readIssueAll = async (req, res) => {
  try {
    const result = await issueModel.findIssueAll({ state: 'open', ...req.query });
    return res.status(200).json({ message: SUCCESS_MSG.read, data: { ...result } });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const readIssueById = async (req, res) => {
  try {
    const { issueId } = req.params;
    const issueInfo = await issueModel.findIssueById(issueId);

    if (!issueInfo) {
      return res.status(404).json({ message: ERROR_MSG.notFound });
    }
    const commentCount = await commentModel.commentCountById(issueId);
    issueInfo.dataValues.commentCount = commentCount;
    if (issueInfo.milestone) {
      const { open, closed } = await issueModel.countIssuesByMilestone(issueInfo.milestone.id);
      const total = open + closed;
      const percent = `${Math.round((closed / total) * 100)}%`;
      issueInfo.dataValues.milestone.dataValues.percent = percent;
    }
    return res.status(200).json({ message: SUCCESS_MSG.read, data: issueInfo });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;
    const isSuccess = await issueModel.deleteIssue(issueId);
    if (isSuccess) return res.status(200).json({ message: SUCCESS_MSG.delete });
    return res.status(404).json({ message: ERROR_MSG.notFound });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const updateIssueTitle = async (req, res) => {
  try {
    const issueData = req.body;
    const { issueId } = req.params;
    const { id: userId } = req.user;

    if (checkValidation.updateTitle(issueData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }

    const issueInfo = await issueModel.findIssueById(issueId);
    if (!issueInfo) {
      return res.status(404).json({ message: ERROR_MSG.notFound });
    }

    const result = await issueModel.compareAuthor(userId, issueId);
    if (!result) {
      return res.status(403).json({ message: ERROR_MSG.issue.notAuthor });
    }

    const { title } = issueData;
    const [updateResult] = await issueModel.updateIssueTitle(issueId, title);

    if (updateResult) return res.status(200).json({ message: SUCCESS_MSG.update });
    return res.status(422).json({ message: ERROR_MSG.update });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const toggleState = async (req, res) => {
  try {
    const stateData = req.body;
    if (!checkValidation.toggle(stateData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const result = await issueModel.updateStateOfIssues(stateData);
    if (result) return res.status(200).json({ message: SUCCESS_MSG.update });
    return res.status(422).json({ message: ERROR_MSG.update });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

const updateIssueDetail = async (req, res) => {
  try {
    const detailData = req.body;
    const { issueId } = req.params;
    if (!checkValidation.updateDetail(detailData)) {
      return res.status(400).json({ message: ERROR_MSG.invalid });
    }
    const result = await issueModel.updateDetailOfIssue({ ...detailData, issueId });
    if (result) return res.status(200).json({ message: SUCCESS_MSG.update });
    return res.status(404).json({ message: ERROR_MSG.notFound });
  } catch (err) {
    return res.status(500).json({ message: ERROR_MSG.server });
  }
};

module.exports = {
  createIssue,
  readIssueAll,
  readIssueById,
  updateIssueTitle,
  toggleState,
  deleteIssue,
  updateIssueDetail,
};
