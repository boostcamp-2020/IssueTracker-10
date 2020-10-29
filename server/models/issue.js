const { issue } = require('./database');

const issueType = {
  closed: 0,
  open: 1,
};

const createIssue = async (issueData) => {
  try {
    const { userId, title } = issueData;
    const issueInfo = (
      await issue.create({
        author: userId,
        title,
        state: issueType.open,
      })
    ).get({ plain: true });
    return issueInfo;
  } catch (err) {
    throw new Error('Error on creating an issue');
  }
};

module.exports = {
  createIssue,
};
