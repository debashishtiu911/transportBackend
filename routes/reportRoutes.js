const express = require('express');
const router = express.Router();
const Consignment = require('../models/consignment');
const Truck = require('../models/truckmodel');

// Truck usage report
router.get('/', async (req, res) => {
  try {
      const usageStats = await Truck.aggregate([
          {
              $group: {
                  _id: "$status",
                  totalTrucks: { $sum: 1 },
                  averageLoadVolume: { $avg: "$currentLoadVolume" },
                  maxLoadVolume: { $max: "$currentLoadVolume" },
                  minLoadVolume: { $min: "$currentLoadVolume" }
              }
          },
          {
              $sort: { _id: 1 } // Sorting by status alphabetically
          }
      ]);

      const totalCapacity = await Truck.aggregate([
          {
              $group: {
                  _id: null,
                  totalCapacity: { $sum: "$capacity" }
              }
          }
      ]);

      res.status(200).send({
          usageStats,
          totalCapacity: totalCapacity[0].totalCapacity
      });
  } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
  }
});


router.get('/waiting-time', async (req, res) => {
  try {
      // First, find trucks that are currently 'Available' or their last status was 'Available'
      const trucks = await Truck.find({ status: 'Available' });

      // Calculate waiting times for these trucks
      let totalWaitingTime = 0;
      let count = 0;

      for (const truck of trucks) {
          const lastAvailableLog = await TruckStatusLog.findOne({ truckId: truck._id, status: 'Available' }).sort({ timestamp: -1 });
          if (lastAvailableLog) {
              const currentTime = new Date();
              const waitingTime = (currentTime - lastAvailableLog.timestamp) / 1000; // Waiting time in seconds
              totalWaitingTime += waitingTime;
              count++;
          }
      }

      const averageWaitingTime = count > 0 ? totalWaitingTime / count : 0;

      res.status(200).send({
          averageWaitingTime,
          unit: 'seconds'
      });
  } catch (error) {
      res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;