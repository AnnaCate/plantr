const express = require('express');
const router = express.Router();
const User = require('../database/models/user');

router.post('/', (req, res) => {
  console.log('user signup');

  const {username, password, email} = req.body;

  // validate username
  User.findOne({username: username}, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username ${username}`,
      });
    } else {
      User.findOne({email: email}, (err, user) => {
        if (err) {
          console.log('User.js post error: ', err);
        } else if (user) {
          res.json({
            error: `The email ${email} is already in use`,
          });
        } else {
          const newUser = new User({
            username: username,
            password: password,
            email: email,
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

module.exports = router;
