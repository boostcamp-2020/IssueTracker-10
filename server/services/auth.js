const qs = require('querystring');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { generateToken } = require('../utils/auth');
const userModel = require('../models/user');

const TEN_MINUTES = 1000 * 60 * 10;

const loginByGitHub = (req, res) => {
  const state = uuidv4();
  const url = process.env.GITHUB_AUTH_URL;
  const query = qs.stringify({
    client_id: process.env.GITHUB_CLIENT,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
    state,
    scope: 'read:user',
  });
  const githubAuthUrl = url + query;
  res.send(githubAuthUrl);
};

const handleGithubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const returnedState = req.query.state;
    const githubUrl = process.env.GITHUB_TOKEN_URL;
    const query = qs.stringify({
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_CLIENT_KEY,
      code,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
      state: returnedState,
    });
    const authUrl = githubUrl + query;

    const result = await axios.post(authUrl);
    const config = {
      headers: {
        Authorization: `token ${qs.parse(result.data).access_token}`,
        'User-Agent': 'Login-App',
      },
    };
    const userData = await axios.get('https://api.github.com/user', config);
    const { login: username, avatar_url } = userData.data;
    const userinfo = await userModel.findOrCreateUserById({ username, avatar: avatar_url });
    const token = generateToken(userinfo.id, userinfo.username);
    res.cookie('auth', token, { maxAge: TEN_MINUTES });
    return res.redirect(process.env.REDIRECT_CLIENT);
  } catch (error) {
    return res.status(500);
  }
};

const createOrReadUser = async (req, res) => {
  try {
    const { username, avatar, state } = req.body;
    const { id } = await userModel.findOrCreateUserById({ username, avatar, state });
    const token = generateToken(id, username);
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500);
  }
};

const readUserInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const userInfo = await userModel.findUserById(id);
    if (userInfo) return res.status(200).json({ data: userInfo });
    return res.status(404).json({});
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  loginByGitHub,
  handleGithubCallback,
  createOrReadUser,
  readUserInfo,
};
