const express = require('express');

const router = express.Router();
const milestoneService = require('../../services/milestone');

router.delete('/:milestoneId', milestoneService.deleteMilestone);

module.exports = router;
