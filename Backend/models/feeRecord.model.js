const mongoose = require('mongoose');
let FeeDetails = require('../models/feeDetails.model');
const Schema = mongoose.Schema;

const feeRecordSchema = new Schema({
  //List of all the indivdual fees of months
  feeList: 
  [
  {
    type:Schema.Types.ObjectId ,ref:'FeeDetails',
  }
  ],
  //Fee still to be paid of all months combined
  outStandingFees:{
    type: Number,
    required: true,
  },
  //Just a sample as of now, will change later

  scholarshipAmount: {
    type: Number,
    required: true
  },
  totalFee: {
    type: Number,
    required: true,

  //tuition Fee
  },
  tuitionFee: {
    type: Number,
    required: true,

  },
  //Misc Fees
  otherFee : {
    type : Number,
    required : true
  },
  //If any security
}, {
  timestamps: true,
});

const FeeRecord = mongoose.model('feeRecord', feeRecordSchema);
FeeRecord.createIndexes();
module.exports = FeeRecord;