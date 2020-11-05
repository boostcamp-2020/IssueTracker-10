const express = require('express');
const { loginByGitHub, handleGithubCallback } = require('../services/auth');

const router = express.Router();

router.get('/github/login', loginByGitHub);
router.get('/github', handleGithubCallback);

module.exports = router;
