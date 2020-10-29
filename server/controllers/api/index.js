const express = require('express');
const findAllIssues = require('../../services');

const router = express.Router();

router.get('/all', findAllIssues);

module.exports = router;
