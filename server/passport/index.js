const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../database/models/user');

// called on login, saves the id to session req.session.passport.user = {id: '..'}
passport.serializeUser((user, done) => {
  console.log('serialize user called');
  done(null, {_id: user._id});
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log('deserialize user called');
  User.findById(id, (err, user) => done(null, user));
});

// use strategies
passport.use(LocalStrategy);

module.exports = passport;
