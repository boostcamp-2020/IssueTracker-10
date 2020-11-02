const express = require('express');

const router = express.Router();
const milestoneService = require('../../services/milestone');

router.delete('/:milestoneId', milestoneService.deleteMilestone);
router.put('/:milestoneId/state', milestoneService.toggleState);

module.exports = router;
