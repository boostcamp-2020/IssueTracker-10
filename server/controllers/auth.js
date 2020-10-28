const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/github/login', passport.authenticate('github'));

router.get('/github', passport.authenticate('github', { session: false }), (req, res) => {
  // TODO: jwt 만들어주기
  res.json({ message: 'hihi' });
});

module.exports = router;
