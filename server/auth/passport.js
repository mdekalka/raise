const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = require('../models/User');

const JWT = 'jwt';
const AUTH_SCHEMA ='bearer';
const EXPIRATION_TIME = '24h';
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

const strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
  User.findById(jwtPayload.id).lean()
    .then(user => {
      if (user) {
        const { password, ...restUser } = user;
        
        next(null, restUser);
      } else {
        next(null, false);
      }
    })
    .catch(err => {
      return next(err, false);
    });
});

module.exports = {
  runStrategy() {
    return passport.use(JWT, strategy);
  },

  initialize() {
    return passport.initialize();
  },
  authenticate() {
    return passport.authenticate(JWT, { session: false });
  },
  tokenize(token) {
    return `${AUTH_SCHEMA} ${token}`;
  },
  expirationTime: EXPIRATION_TIME
};
