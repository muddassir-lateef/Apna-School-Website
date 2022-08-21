const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salaryInvoiceSchema = new Schema({
  
    // total salary of the employee for the particular month
  totalamount: {
    type: Number,
    required: true,

  },
  // month and year of the pay slip
  date:{
    type:Date,
    required:true,
  },
  // tells whether this salary had been paid
  paid: {
    type: Boolean,
    required: true,
  },
  // the basic pay of the employee per month
  basicPay: {
    type: Number,
    required: true,
  },
  // incentives to the pay of the employee
  incentives: {
    type: Number,
    required: true,
  },

}, {
  timestamps: true,
});

const User = mongoose.model('SalaryInvoice', salaryInvoiceSchema);

module.exports = User;