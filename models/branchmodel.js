const mongoose = require('mongoose');

const branchOfficeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  consignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consignment'
  }]
});

const BranchOffice = mongoose.model('BranchOffice', branchOfficeSchema);

module.exports = BranchOffice;
