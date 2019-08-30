const User = require('../database/models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy((username, password, done) => {
  console.log('Local strategy called');
  User.findOne({username: username}, (err, user) => {
    if (err) {
      console.log('Local strategy had an error');
      return done(err);
    }
    if (!user) {
      console.log('Local strategy did not find a user');
      return done(null, false);
    }
    if (!user.checkPassword(password)) {
      console.log('Local strategy found a user but the password failed');
      return done(null, false);
    }
    console.log('Local strategy found a user and confirmed password');
    return done(null, user);
  });
});

module.exports = strategy;
