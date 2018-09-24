var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const exjwt = require('express-jwt');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const forgotPasswordRouter = require('./routes/forgotPassword');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/user')

require('./config/databaseConnect')

var app = express();

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', jwtMW, indexRouter);

// Public routes
app.use('/login', loginRouter);
app.use('/forgot-password', forgotPasswordRouter);
app.use('/register', registerRouter);

// Private routes with authentification
app.use('/user', userRouter)

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
