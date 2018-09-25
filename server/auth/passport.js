const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

const strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
  console.log(jwtPayload, '!!!!!!!');

  User.findOneById(jwtPayload.id)
    .then(user => {
      console.log(user, "USER")
      return next(null, user);
    })
    .catch(err => {
      console.log(err, "ERR")
      return next(err, false);
    });
});
passport.use('jwt', strategy);

module.exports = {
  initialize() {
    return passport.initialize();
  },
  authenticate() {
    return passport.authenticate('jwt', { session: false });
  }
};