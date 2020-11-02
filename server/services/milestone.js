const { findMilestoneList } = require('../models/milestone');
const { countIssuesByMilestone } = require('../models/issue');
const successMessages = require('./successMessages');
const errorMessages = require('./errorMessages');

const selectMilestoneList = async (req, res) => {
  try {
    const { state = 1 } = req.query;
    const milestones = await findMilestoneList(state);
    const resData = await Promise.all(
      milestones.map(async (msData) => {
        const { id } = msData;
        const issueCount = await countIssuesByMilestone(id);
        return { ...msData, ...issueCount };
      }),
    );
    return res.status(200).json({ message: successMessages.milestone.read, data: resData });
  } catch (err) {
    return res.status(500).json({ message: errorMessages.server });
  }
};

module.exports = {
  selectMilestoneList,
};
