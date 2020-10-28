const passport = require('passport');
const GithubStrategy = require('passport-github');
const userModel = require('../models/user');

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT,
  clientSecret: process.env.GITHUB_CLIENT_KEY,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const githubVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    const { username, photos } = profile;
    const [photo] = photos;
    const { value: avatar } = photo;
    const user = await userModel.findOrCreateUserById({ username, avatar });

    if (user) return done(null, user);
    return done(null, false, { reason: '올바르지 않은 인증정보입니다.' });
  } catch (err) {
    return done(err);
  }
};

module.exports = () => {
  passport.use(new GithubStrategy(githubConfig, githubVerify));
};
