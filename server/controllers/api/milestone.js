const express = require('express');

const router = express.Router();
const milestoneService = require('../../services/milestone');

router.get('/', milestoneService.selectMilestoneList);

module.exports = router;
