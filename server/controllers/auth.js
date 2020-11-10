const express = require('express');
const {
  loginByGitHub,
  handleGithubCallback,
  createOrReadUser,
  readUserInfo,
} = require('../services/auth');
const authenticateJwt = require('../middlewares/authenticateJwt');

const router = express.Router();

router.get('/github/login', loginByGitHub);
router.get('/github', handleGithubCallback);
router.post('/login', authenticateJwt, createOrReadUser);
router.get('/user', authenticateJwt, readUserInfo);

module.exports = router;
