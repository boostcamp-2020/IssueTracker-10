const createError = require('http-errors');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

const { sequelize } = require('./models/database');
const passportConfig = require('./middlewares/passport');

sequelize
  .sync()
  .then(() => console.log('DB 연결 성공'))
  .catch((err) => console.log(err));

const router = require('./controllers');
const apiRouter = require('./controllers/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
passportConfig();

app.use(router);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
