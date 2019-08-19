const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = Promise; // maybe don't need this?

// define gardenPlantSchema
const gardenPlantSchema = new Schema({
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  plant: [{type: Schema.Types.ObjectId, ref: 'Plant'}],
  variety: String,
  dateStartedIndoors: Date,
  dateDirectSowed: Date,
  numSeedsSowed: Number,
  numGerminated: Number,
  dateTransplanted: Date,
  numTransplanted: Number,
  observations: String,
});

const gardenPlant = mongoose.model('Garden-plant', gardenPlantSchema);
module.exports = gardenPlant;
