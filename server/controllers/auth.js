const express = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/auth');

const router = express.Router();

router.get('/github/login', passport.authenticate('github'));

router.get('/github', passport.authenticate('github', { session: false }), (req, res) => {
  const { user } = req;
  const token = generateToken(user.id, user.username);
  res.status(200).json({ message: 'success', token });
});

module.exports = router;
