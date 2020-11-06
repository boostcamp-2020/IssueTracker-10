const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userModel = require('../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
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

module.exports = () => {
  passport.use(new JwtStrategy(jwtOptions, verifyJwt));
};
