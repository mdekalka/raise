const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressGraphQL = require('express-graphql');

require('dotenv').config();
require('./config/databaseConnect');

require('./models');
const schema = require('./schema/schema');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const forgotPasswordRouter = require('./routes/forgotPassword');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/user');
const currentUserRoute = require('./routes/currentUser');
const usersRouter = require('./routes/users')
const passportAuth = require('./auth/passport');


const app = express();
app.use(passportAuth.initialize());

passportAuth.runStrategy();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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


app.use('/api/v1', apiV1Routes);

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

// Index route
apiV1Routes.get('/', passportAuth.authenticate(), indexRouter);

// Public routes
apiV1Routes.use('/login', loginRouter);
apiV1Routes.use('/forgot-password', forgotPasswordRouter);
apiV1Routes.use('/register', registerRouter);

// Private routes with authentification
apiV1Routes.use('/currentUser', passportAuth.authenticate(), currentUserRoute);
apiV1Routes.use('/settings', passportAuth.authenticate(), userRouter);
apiV1Routes.use('/users', passportAuth.authenticate(), usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err, "ERERER")
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: 'Application error.' });
});

module.exports = app;
