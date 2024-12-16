const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategies');
const JwtStrategy = require('./strategies/jwt.strategies');


module.exports = function initializePassport(app) {
    passport.use(LocalStrategy);
    passport.use(JwtStrategy);
    app.use(passport.initialize());
  };
