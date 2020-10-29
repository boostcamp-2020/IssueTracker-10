const express = require('express');

const router = express.Router();
const authRouter = require('./auth');
const apiRouter = require('./api');
const authenticateJwt = require('../middlewares/authenticateJwt');

router.use('/auth', authRouter);
router.use('/api', authenticateJwt, apiRouter);

module.exports = router;
