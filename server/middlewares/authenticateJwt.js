const passport = require('passport');

const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) res.status(500).json({ message: '에러' });
    if (!user) res.status(401).json({ message: '로그인 중이 아님' });
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticateJwt;
