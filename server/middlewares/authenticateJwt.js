const passport = require('passport');
const errorMessages = require('../services/errorMessages');

const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) return res.status(500).json({ message: errorMessages.server });
    if (!user) return res.status(401).json({ message: errorMessages.unauthorized });
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = authenticateJwt;
