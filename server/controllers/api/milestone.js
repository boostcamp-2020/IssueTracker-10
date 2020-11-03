const express = require('express');

const router = express.Router();
const milestoneService = require('../../services/milestone');

router.get('/', milestoneService.readMilestoneByState);
router.get('/:milestoneId', milestoneService.readMilestoneById);
router.post('/', milestoneService.createMilestone);
router.put('/:milestoneId', milestoneService.updateMilestone);
router.put('/:milestoneId/state', milestoneService.toggleState);
router.delete('/:milestoneId', milestoneService.deleteMilestone);

module.exports = router;
