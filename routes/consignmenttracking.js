const express = require('express');
const router = express.Router();
const app = express();
app.use(express.json());

const Consignment = require('../models/consignment');

// Post a new consignment

router.post('/', async (req, res) => {
  const consignment = new Consignment({
    volume: req.body.volume,
    senderAddress: req.body.senderAddress,
    destinationAddress: req.body.destinationAddress,
    status: req.body.status,
    transportCharge: req.body.transportCharge,
    truck: req.body._id
  });
  try {
    const newConsignment = await consignment.save();
    res.status(201).json(newConsignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const consignment = await Consignment.find();
    res.json(consignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  console.log("Delete route hit for ID:", req.params.id);
  try {
    const { id } = req.params;
    const consignment = await Consignment.findByIdAndDelete(id);
    if (!consignment) {
      return res.status(404).json({ message: 'consignment not found' });
    }
    res.json({ message: 'consignment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
});
// Update consignment status
router.patch('/:id', async (req, res) => {
  try {
    const updatedConsignment = await Consignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedConsignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch consignment by ID
router.get('/:id', async (req, res) => {
  try {
    const consignment = await Consignment.findById(req.params.id);
    console.log("Delete route hit for ID:", req.params.id);
    if (consignment) {
      res.json(consignment);
    } else {
      res.status(404).json({ message: "Consignment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

