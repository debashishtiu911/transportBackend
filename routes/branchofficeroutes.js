const express = require('express');
const router = express.Router();
const app = express();
const BranchOffice = require('../models/branchmodel'); // Adjust the path based on your project structure

// Get all branch offices
router.get('/getall', async (req, res) => {
  try {
    const branchOffices = await BranchOffice.find();
    res.json(branchOffices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new branch office
router.post('/post', async (req, res) => {
  const branchOffice = new BranchOffice({
    name: req.body.name,
    address: req.body.address,
    consignments: req.body.consignments // Assuming this is an array of consignment IDs
  });

  try {
    const newBranchOffice = await branchOffice.save();
    res.status(201).json(newBranchOffice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single branch office
router.get('/get/:id', async (req, res) => {
  try {
    const branchOffice = await BranchOffice.findById(req.params.id);
    if (!branchOffice) {
      return res.status(404).json({ message: 'Branch Office not found' });
    }
    res.json(branchOffice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a branch office
router.put('/put/:id', async (req, res) => {
  try {
    const updatedBranchOffice = await BranchOffice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBranchOffice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a branch office
router.delete('/del/:id', async (req, res) => {
  try {
    const branchOffice = await BranchOffice.findByIdAndDelete(req.params.id);
    if (!branchOffice) {
      return res.status(404).json({ message: 'Branch Office not found' });
    }
    res.json({ message: 'Branch Office deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
