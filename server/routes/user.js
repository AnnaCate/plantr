const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const passport = require('../passport');

// SIGN UP
router.post('/', (req, res) => {
  const {username, password, email, hardinessZone} = req.body;

  // validate username
  User.findOne({username: username}, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err);
    } else if (user) {
      res.json({
        error: `Sorry, username ${username} is already in use.`,
      });
    } else {
      User.findOne({email: email}, (err, user) => {
        if (err) {
          console.log('User.js post error: ', err);
        } else if (user) {
          res.json({
            error: `The email ${email} is already in use.`,
          });
        } else {
          const newUser = new User({
            username: username,
            password: password,
            email: email,
            hardinessZone: hardinessZone,
          });
          newUser.save((err, savedUser) => {
            if (err) return res.json(err);
            res.json(savedUser);
          });
        }
      });
    }
  });
});

// LOG IN
router.post('/login', passport.authenticate('local'), (req, res) => {
  const userInfo = {
    _id: req.user._id,
    username: req.user.username,
    hardinessZone: req.user.hardinessZone,
    email: req.user.email,
  };
  res.send(userInfo);
});

// GET LOGGED IN USER
router.get('/', (req, res) =>
  req.user ? res.json({user: req.user}) : res.json({user: null})
);

// UPDATE LOGGED IN USER
router.put('/profile/:userId', (req, res) => {
  const {hardinessZone} = req.body;

  User.findById(req.params.userId).then(foundUser => {
    foundUser.hardinessZone = hardinessZone;
    foundUser.save();
    res.json(foundUser);
  });
});

// LOG OUT
router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({msg: 'logging out'});
  } else res.send({msg: 'no user to log out'});
});

module.exports = router;
