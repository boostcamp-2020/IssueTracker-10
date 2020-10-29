const passport = require('passport');
const GithubStrategy = require('passport-github');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const verifyJwt = async (payload, done) => {
  try {
    const { id } = payload;
    const user = await userModel.findUserById(id);

    if (user) return done(null, user);
    return done(null, false, { reason: '올바르지 않은 인증정보입니다.' });
  } catch (err) {
    return done(err);
  }
};

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT,
  clientSecret: process.env.GITHUB_CLIENT_KEY,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

const verifyGithub = async (accessToken, refreshToken, profile, done) => {
  try {
    const { username, photos } = profile;
    const [photo] = photos;
    const { value: avatar } = photo;
    const [user] = await userModel.findOrCreateUserById({ username, avatar });

    if (user) return done(null, user);
    return done(null, false, { reason: '올바르지 않은 인증정보입니다.' });
  } catch (err) {
    return done(err);
  }
};

module.exports = () => {
  passport.use(new JwtStrategy(jwtOptions, verifyJwt));
  passport.use(new GithubStrategy(githubConfig, verifyGithub));
};
