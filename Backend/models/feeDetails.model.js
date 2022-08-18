const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feeDetailsSchema = new Schema({
  //The month of the fee
  feeMonth:{
    type: String,
    required: true,
    //testing
  },
  //Sum of all individual fees
  totalFee: {
    type: Integer,
    required: true,

  //tuition Fee
  },
  tuitionFee: {
    type: Integer,
    required: true,

  },
  //If any fines
  fineFee: {
    type: Integer,
    required: true,
  },
  //If any security
  securityFee: {
    type : Integer,
    required : true,
  },
  //Amount paid as of yet
  paidFee: {
    type : Integer,
    required : true,
  },
  remainingFee: {
    type : Integer,
    required : true,
  }


}, {
  timestamps: true,
});

const FeeDetails = mongoose.model('FeeDetails', feeDetailsSchema);

module.exports = FeeDetails;