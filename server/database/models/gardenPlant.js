const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define gardenPlantSchema
const gardenPlantSchema = new Schema({
  user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  plant: [{type: mongoose.Schema.Types.ObjectId, ref: 'Plant'}],
  variety: String,
  dateStartedIndoors: String,
  dateDirectSowed: String,
  numSeedsSowed: Number,
  numGerminated: Number,
  dateTransplanted: String,
  numTransplanted: Number,
  observations: String,
});

const gardenPlant = mongoose.model('Garden-plant', gardenPlantSchema);
module.exports = gardenPlant;
