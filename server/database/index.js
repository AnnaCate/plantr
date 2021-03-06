// connect to Mongo database
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/flora-files';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to Mongo'))
  .catch(err => {
    console.log('error connecting to Mongo:');
    console.log(err);
  });

module.exports = mongoose.connection;
