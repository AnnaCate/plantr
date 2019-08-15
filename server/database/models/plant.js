const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.promise = Promise; // maybe don't need this?

// define plantSchema
const plantSchema = new Schema({
  commonName: {
    type: String,
    required: true,
    unique: true,
  },
  sunHrs: {
    type: String,
  },
  soil: {
    type: String,
  },
  minPh: {
    type: Number,
  },
  maxPh: {
    type: Number,
  },
  companions: {
    type: Array,
  },
  enemies: {
    type: Array,
  },
  spacingBtwnPlants_in: {
    type: String,
  },
  spacingBtwnRows_in: {
    type: String,
  },
  water: {
    type: String,
  },
  fertilizer: {
    type: String,
  },
  diseases: {
    type: Array,
  },
  pests: {
    type: Array,
  },
  images: {
    type: Array,
  },
  startSeedsIndoors: {
    type: String,
  },
  daysToGermination: {
    type: String,
  },
  transplant: {
    type: String,
  },
  directSow: {
    type: String,
  },
  usdaHardinessZones: {
    type: Array,
  },
  otherCare: {
    type: String,
  },
  daysToHarvest: {
    type: String,
  },
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;
