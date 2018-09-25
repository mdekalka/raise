const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const forgotPasswordRouter = require('./routes/forgotPassword');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/user');
const passportAuth = require('./auth/passport');

require('./config/databaseConnect')

const app = express();
app.use(passportAuth.initialize());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

// const apiRoutes = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', passportAuth.authenticate(), indexRouter);

// Public routes
app.use('/login', loginRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/register', registerRouter);

// Private routes with authentification
app.use('/user', passportAuth.authenticate(), userRouter);

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
