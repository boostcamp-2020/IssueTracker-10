const express = require('express');

const router = express.Router();
const milestoneService = require('../../services/milestone');

router.get('/', milestoneService.selectMilestoneList);
router.put('/:milestoneId/state', milestoneService.toggleState);
router.delete('/:milestoneId', milestoneService.deleteMilestone);

module.exports = router;
