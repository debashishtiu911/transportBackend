const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  truckNumber: {
    type: Number,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'On Route', 'Maintenance'],
    default: 'Available'
  },
  capacity: {
    type: Number,
    required: true
  },
  currentLoadVolume: {
    type: Number,
    required: true,
    default: 0
  },timestamp: {
  
    type: Date,
    default: Date.now,
    required: true
  }
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
