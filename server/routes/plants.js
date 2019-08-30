const express = require('express');
const router = express.Router();
const Plant = require('../database/models/plant');

// GET ALL PLANTS
router.get('/', async (req, res) => {
  const plants = await Plant.find({});
  res.json({status: 'ok', data: plants});
});

// GET PLANT BY ID
// router.get('/:id', async (req, res) => {
//   const plant = await Plant.findOne({_id: req.params.id}).exec();
//   res.json({status: 'ok', plant: plant});
// });

module.exports = router;
