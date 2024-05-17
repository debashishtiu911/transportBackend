const express = require('express');
const router = express.Router();
const Truck = require('../models/truckmodel');

// Get all trucks
router.get('/', async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add a new truck
router.post('/', async (req, res) => {
  const truck = new Truck({
    truckNumber: req.body.truckNumber,
    status: req.body.status,
    capacity: req.body.capacity,
    currentLoadVolume: req.body.currentLoadVolume
  });

  try {
    const newTruck = await truck.save();
    console.log('data saved')
    res.status(201).json(newTruck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) {
      return res.status(404).json({ message: 'truck not found' });
    }
    res.json({ message: 'truck deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update a TRuck
router.put('/:id', async (req, res) => {
  try {
    const updatedtruck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedtruck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Additional CRUD operations (PUT, DELETE) can be implemented similarly

module.exports = router;
