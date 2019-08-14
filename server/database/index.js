// connect to Mongo database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // why?

const uri = 'mongodb://localhost:27017/flora-files';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log('Connected to Mongo');
    },
    err => {
      console.log('error connecting to Mongo:');
      console.log(err);
    }
  );

module.exports = mongoose.connection;
