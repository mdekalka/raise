const createError = require('http-errors');
const passport = require("passport");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const forgotPasswordRouter = require('./routes/forgotPassword');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/user');
const currentUserRoute = require('./routes/currentUser');
const passportAuth = require('./auth/passport');

require('./config/databaseConnect');

const app = express();
app.use(passportAuth.initialize());

passportAuth.runStrategy();

app.use((req, res, next) => {
  // TODO: for some reason CRA proxy in package.json failed due this header. Investigate.
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

const apiV1Routes = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index route
apiV1Routes.get('/', passportAuth.authenticate(), indexRouter);

// Public routes
apiV1Routes.use('/login', loginRouter);
apiV1Routes.use('/forgot-password', forgotPasswordRouter);
apiV1Routes.use('/register', registerRouter);
apiV1Routes.use('/currentUser', passportAuth.authenticate(), currentUserRoute);

// Private routes with authentification
apiV1Routes.use('/user', passportAuth.authenticate(), userRouter);

app.use('/api/v1', apiV1Routes);

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
