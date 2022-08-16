const mongoose = require('mongoose');
let FeeDetails = require('../models/feeDetails.model');
const Schema = mongoose.Schema;

const feeRecordSchema = new Schema({
  //List of all the indivdual fees of months
  feeList: {
    type:Schema.Types.ObjectId ,ref:"FeeDetails",
  },
  //Fee still to be paid of all months combined
  outstandingFees:{
    type: Number,
    required: true,
  },
  //Just a sample as of now, will change later
  sampleAttribute: {
    type: String,
    required: true,
},
}, {
  timestamps: true,
});

const FeeRecord = mongoose.model('feeRecord', feeRecordSchema);

module.exports = FeeRecord;