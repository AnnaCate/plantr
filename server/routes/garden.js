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

// GET GARDEN PLANTS
router.get('/:userId', (req, res, next) => {
  GardenPlant.find({user: req.params.userId})
    .populate('plant')
    .then(plants => res.json({status: 'ok', data: plants}));
});

// DELETE PLANT FROM GARDEN
router.delete('/:gardenPlantId', (req, response, next) => {
  GardenPlant.findByIdAndDelete({_id: req.params.gardenPlantId}).then(res =>
    response.json({status: 'ok', res: req.params.gardenPlantId})
  );
});

module.exports = router;
