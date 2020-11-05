const express = require('express');
const { loginByGitHub, handleGithubCallback, createOrReadUser } = require('../services/auth');
const authenticateJwt = require('../middlewares/authenticateJwt');

const router = express.Router();

router.get('/github/login', loginByGitHub);
router.get('/github', handleGithubCallback);
router.post('/login', authenticateJwt, createOrReadUser);

module.exports = router;
