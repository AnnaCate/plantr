const express = require('express');
const router = express.Router();
const Plant = require('../database/models/plant');

// GET ALL PLANTS
router.get('/', (req, res, next) => {
  console.log('===== got plants ======');
  Plant.find({}).then(plants => res.json({status: 'ok', data: plants}));
});

// GET PLANT BY SEARCH TERM

// GET PLANT BY ID (SEE DETAILS)
router.get('/:id', (req, res, next) => {
  Plant.findOne({_id: req.params.id}, (err, foundPlant) =>
    res.json({status: 'ok', plant: foundPlant})
  );
});

module.exports = router;
