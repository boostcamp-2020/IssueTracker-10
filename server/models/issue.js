const sequelize = require('sequelize');
const { issue, user, milestone: milestoneDB, label: labelDB } = require('./database');
const { countLabelByIds } = require('./label');
const { countUserByIds } = require('./user');
const ERROR_MSG = require('../services/errorMessages');

const { Op } = sequelize;

const issueType = {
  closed: 0,
  open: 1,
  all: 2,
};

const createIssueLabel = async (params) => {
  try {
    const { issueInfo, labels } = params;
    const result = await Promise.all(
      labels.map(async (labelId) => {
        await issueInfo.addLabel(labelId);
      }),
    );
    return result;
  } catch (err) {
    throw new Error(ERROR_MSG.invalid);
  }
};

const createIssueAssignee = async (params) => {
  try {
    const { issueInfo, assignees } = params;
    const result = await Promise.all(
      assignees.map(async (userId) => {
        await issueInfo.addAssignee(userId);
      }),
    );
    return result;
  } catch (err) {
    throw new Error(ERROR_MSG.invalid);
  }
};

const createIssue = async (issueData) => {
  try {
    const { userId, title, milestoneId, assignees = [], labels = [] } = issueData;
    if (labels.length > 0) {
      const labelCount = await countLabelByIds(labels);
      if (labelCount !== labels.length) return false;
    }
    if (assignees.length > 0) {
      const assigneeCount = await countUserByIds(assignees);
      if (assigneeCount !== assignees.length) return false;
    }
    const issueInfo = await issue.create({
      author: userId,
      title,
      state: issueType.open,
      milestoneId,
    });
    if (labels.length > 0) await createIssueLabel({ issueInfo, labels });
    if (assignees.length > 0) await createIssueAssignee({ issueInfo, assignees });
    return issueInfo;
  } catch (err) {
    throw new Error(ERROR_MSG.create);
  }
};

const deleteIssue = async (issueId) => {
  try {
    const result = await issue.destroy({ where: { id: issueId } });
    return !!result;
  } catch (err) {
    throw new Error(ERROR_MSG.delete);
  }
};

const findIssueById = async (id) => {
  try {
    const issueInfo = await issue.findOne({
      attributes: ['id', 'title', 'state', 'createdAt'],
      order: [['id', 'DESC']],
      include: [
        {
          model: user,
          attributes: ['id', 'username'],
          required: true,
        },
        {
          model: milestoneDB,
          attributes: ['id', 'title'],
        },
        {
          model: labelDB,
          attributes: ['id', 'title', 'color'],
          through: {
            attributes: [],
          },
        },
        {
          model: user,
          as: 'assignees',
          attributes: ['id', 'username', 'avatar'],
          through: {
            attributes: [],
          },
        },
      ],
      where: { id },
    });

    if (issueInfo) return issueInfo;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const setFilter = (query) => {
  const filter = [...Object.keys(query)].reduce((prev, key) => {
    const value = query[key];
    switch (key) {
      case 'milestone': {
        return { ...prev, milestoneId: value };
      }
      case 'author': {
        return { ...prev, author: value };
      }
      case 'search': {
        return { ...prev, title: { [Op.substring]: value } };
      }
      default: {
        return prev;
      }
    }
  }, {});
  return filter;
};

const findIssueAll = async (query) => {
  try {
    const { label, assignee } = query;
    const filter = setFilter(query);
    const labelFilter = label ? { where: { id: label } } : {};
    const assigneeFilter = assignee ? { where: { id: assignee } } : {};

    const issues = await issue.findAll({
      attributes: ['id', 'title', 'state', 'createdAt', 'updatedAt'],
      where: { ...filter },
      order: [['id', 'DESC']],
      include: [
        {
          model: user,
          attributes: ['id', 'username', 'avatar'],
          require: true,
        },
        {
          model: milestoneDB,
          as: 'milestone',
          attributes: ['id', 'title'],
        },
        {
          model: labelDB,
          attributes: ['id', 'title', 'color'],
          through: {
            attributes: [],
          },
          ...labelFilter,
        },
        {
          model: user,
          as: 'assignees',
          attributes: ['id', 'username', 'avatar'],
          through: {
            attributes: [],
          },
          ...assigneeFilter,
        },
      ],
    });

    const filterType = issueType[query.state];
    const result = issues.reduce(
      (prev, issueData) => {
        const { state } = issueData;
        if (!filterType || filterType === issueType.all || state === filterType) {
          return { ...prev, [state]: prev[state] + 1, issues: [...prev.issues, issueData] };
        }
        return { ...prev, [state]: prev[state] + 1 };
      },
      { 0: 0, 1: 0, issues: [] },
    );
    return { closedCount: result[0], openCount: result[1], issues: result.issues };
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const countAllClosedIssues = async () => {
  try {
    const closedCount = await issue.count({ where: { state: issueType.closed } });

    return closedCount;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const countAllOpenIssues = async () => {
  try {
    const openCount = await issue.count({ where: { state: issueType.open } });

    return openCount;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const countClosedIssuesByMilestone = async (milestoneId) => {
  try {
    const closedCount = await issue.count({ where: { state: issueType.closed, milestoneId } });

    return closedCount;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const countOpenIssuesByMilestone = async (milestoneId) => {
  try {
    const openCount = await issue.count({ where: { state: issueType.open, milestoneId } });

    return openCount;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const countIssuesByMilestone = async (milestoneId) => {
  try {
    const closedCount = await countClosedIssuesByMilestone(milestoneId);
    const openCount = await countOpenIssuesByMilestone(milestoneId);
    return { closed: closedCount, open: openCount };
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const compareAuthor = async (userId, issueId) => {
  try {
    const result = issue.findOne({
      where: {
        id: issueId,
        author: userId,
      },
    });
    return result;
  } catch (err) {
    throw new Error(ERROR_MSG.issue.compareAuthorFailed);
  }
};

const updateIssueTitle = async (id, title) => {
  try {
    const result = issue.update({ title }, { where: { id } });
    return result;
  } catch (err) {
    throw new Error(ERROR_MSG.update);
  }
};

const updateStateOfIssues = async (stateData) => {
  try {
    const { state, issueIds } = stateData;
    const [updatedResult] = await issue.update({ state }, { where: { id: { [Op.in]: issueIds } } });
    return updatedResult === issueIds.length;
  } catch (err) {
    throw new Error(ERROR_MSG.update);
  }
};

const addMilestoneOfIssue = async (idData) => {
  try {
    const { issueId, milestoneId } = idData;
    const result = await issue.update({ milestoneId }, { where: { id: issueId } });
    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.update);
  }
};

const deleteMilestoneOfIssue = async (issueId) => {
  try {
    const result = await issue.update({ milestoneId: null }, { where: { id: issueId } });
    if (result) return true;
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.update);
  }
};

const updateDetailOfIssue = async (detailData) => {
  try {
    const { type, method, data, issueId } = detailData;
    const issueInfo = await findIssueById(issueId);
    if (!issueInfo) return false;
    switch (type) {
      case 'assignee':
        if (method) return await issueInfo.addAssignee(data);
        return await issueInfo.removeAssignee(data);
      case 'label':
        if (method) return await issueInfo.addLabel(data);
        return await issueInfo.removeLabel(data);
      case 'milestone':
        if (method) return await addMilestoneOfIssue({ issueId, milestoneId: data });
        return await deleteMilestoneOfIssue(issueId);
      default:
        return false;
    }
  } catch (err) {
    throw new Error(ERROR_MSG.update);
  }
};

module.exports = {
  createIssue,
  deleteIssue,
  findIssueById,
  findIssueAll,
  countAllClosedIssues,
  countAllOpenIssues,
  countIssuesByMilestone,
  compareAuthor,
  updateIssueTitle,
  updateStateOfIssues,
  updateDetailOfIssue,
};
