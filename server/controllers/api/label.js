const express = require('express');

const router = express.Router();
const labelService = require('../../services/label');

router.get('/', labelService.getAllLabels);
router.post('/', labelService.createLabel);

module.exports = router;
