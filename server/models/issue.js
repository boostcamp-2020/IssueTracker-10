const sequelize = require('sequelize');
const { issue, user, milestone: milestoneDB, label: labelDB } = require('./database');
const { countLabelByIds } = require('./label');
const { countUserByIds } = require('./user');
const ERROR_MSG = require('../services/errorMessages');

const { Op } = sequelize;

const issueType = {
  closed: 0,
  open: 1,
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

    if (issueInfo) return issueInfo.get({ plain: true });
    return false;
  } catch (err) {
    throw new Error(ERROR_MSG.notFound);
  }
};

const setFilter = (query) => {
  const filter = [...Object.keys(query)].reduce((prev, key) => {
    const value = query[key];
    switch (key) {
      case 'state': {
        const type = issueType[value];
        return type !== undefined ? { ...prev, state: issueType[value] } : prev;
      }
      case 'milestone': {
        return { ...prev, milestoneId: value };
      }
      case 'author': {
        return { ...prev, author: value };
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
    return issues;
  } catch (err) {
    console.log(err);
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
};
