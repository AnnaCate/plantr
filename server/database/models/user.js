const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = Promise; // why?

// define userSchema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
