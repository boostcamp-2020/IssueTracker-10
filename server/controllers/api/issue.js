const express = require('express');

const router = express.Router();
const { createIssue } = require('../../services/issue');

router.post('/', createIssue);

module.exports = router;
