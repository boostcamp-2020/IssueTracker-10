const express = require('express');

const router = express.Router();
const labelService = require('../../services/label');

router.post('/', labelService.createLabel);

module.exports = router;
