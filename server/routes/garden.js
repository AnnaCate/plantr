const express = require('express');
const router = express.Router();
const GardenPlant = require('../database/models/gardenPlant');

// SAVE PLANT TO GARDEN
router.post('/', (req, res) => {
  const {user, plant} = req.body;
  GardenPlant.findOne({user: user, plant: plant}, (err, foundPlant) => {
    if (err) {
      console.log(err);
    } else if (foundPlant) {
      res.json({error: 'Already planted'});
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
        if (err) {
          res.json({error: 'Error saving plant to garden'});
        } else {
          res.json(savedGardenPlant);
        }
      });
    }
  });
});

// GET GARDEN PLANTS
router.get('/:userId', (req, res) => {
  GardenPlant.find({user: req.params.userId})
    .populate('plant')
    .then(plants => res.json({status: 'ok', data: plants}));
});

// GET GARDEN PLANT DETAILS
router.get('/details/:gardenPlantId', (req, res) => {
  GardenPlant.findById(req.params.gardenPlantId)
    .populate('plant')
    .then(plant => res.json({status: 'ok', data: plant}));
});

// PUT GARDEN PLANT DETAILS
router.put('/details/:gardenPlantId', (req, res) => {
  GardenPlant.findById(req.params.gardenPlantId).then(plant => {
    plant.variety = req.body.variety;
    plant.dateStartedIndoors = req.body.dateStartedIndoors;
    plant.dateDirectSowed = req.body.dateDirectSowed;
    plant.numSeedsSowed = req.body.numSeedsSowed;
    plant.numGerminated = req.body.numGerminated;
    plant.dateTransplanted = req.body.dateTransplanted;
    plant.numTransplanted = req.body.numTransplanted;
    plant.observations = req.body.observations;
    plant.save();
    res.json({status: 'ok', data: plant});
  });
});

// DELETE PLANT FROM GARDEN
router.delete('/:gardenPlantId', (req, res) => {
  GardenPlant.findByIdAndDelete({_id: req.params.gardenPlantId}).then(() =>
    res.json({status: 'ok', res: req.params.gardenPlantId})
  );
});

module.exports = router;
