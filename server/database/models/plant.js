const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define plantSchema
const plantSchema = new Schema({
  commonName: String,
  sunHrs: String,
  soil: String,
  minPh: Number,
  maxPh: Number,
  companions: Array,
  enemies: Array,
  spacingBtwnPlants_in: String,
  spacingBtwnRows_in: String,
  water: String,
  fertilizer: String,
  diseases: Array,
  pests: Array,
  images: Array,
  startSeedsIndoors: String,
  daysToGermination: String,
  transplant: String,
  directSow: String,
  usdaHardinessZones: Array,
  otherCare: String,
  daysToHarvest: String,
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;
