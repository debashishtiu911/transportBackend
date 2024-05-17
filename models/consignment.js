const mongoose = require('mongoose');

const consignmentSchema = new mongoose.Schema({
  volume: { type: Number, required: true },

  senderAddress: { type: String, required: true },

  destinationAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  status: { 
    type: String,
    enum: ['pending', 'shipped', 'Dispatched'],
    default: 'pending'
    }, // e.g., Pending, Dispatched

  transportCharge: { type: Number, required: true },
  
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }
});

const Consignment = mongoose.model('Consignment', consignmentSchema);

module.exports = Consignment;


