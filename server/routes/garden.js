const express = require('express');
const router = express.Router();
const GardenPlant = require('../database/models/gardenPlant');

// SAVE PLANT TO GARDEN
router.post('/', (req, res, next) => {
  const {user, plant} = req.body;
  GardenPlant.findOne({user: user, plant: plant}, (err, foundPlant) => {
    if (foundPlant) {
      res.json({
        error: 'Already planted',
      });
    } else {
      const newGardenPlant = new GardenPlant({
        user: user,
        plant: plant,
        variety: '',
        dateStartedIndoors: null,
        dateDirectSowed: null,
        numSeedsSowed: null,
        numGerminated: null,
        dateTransplanted: null,
        numTransplanted: null,
        observations: '',
      });
      newGardenPlant.save((err, savedGardenPlant) => {
        if (err) return res.json(err);
        res.json(savedGardenPlant);
      });
    }
  });
});

// GET PLANTED PLANTS
router.get('/:userId', (req, res, next) => {
  GardenPlant.find({user: req.params.userId})
    // .populate('plant')
    .populate('plant')
    .exec()
    .then(plants => res.json({status: 'ok', data: plants}));
});

module.exports = router;
