const express = require('express');
const router = express.Router();
const app = express();
const Consignment = require('../models/consignment');
const Truck = require('../models/truckmodel');


// Consignment statistics report
router.get('/', async (req, res) =>{ try {
  const stats = await Consignment.aggregate([
      {
          $group: {
              _id: null,
              totalVolume: { $sum: "$volume" },
              totalRevenue: { $sum: "$transportCharge" },
              averageRevenue: { $avg: "$transportCharge" },
              count: { $sum: 1 }
          }
      }
  ]);

  if (stats.length === 0) {
      res.status(404).send({ message: 'No consignment statistics available' });
      return;
  }

  res.status(200).send(stats[0]);
} catch (error) {
  res.status(500).send({ message: 'Server error', error: error.message });
}
});
// router.get('/',async (req,res)=>{
//     console.log('welcome conginment ');
// })
  
  module.exports = router;