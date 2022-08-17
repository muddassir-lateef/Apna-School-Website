const mongoose = require('mongoose');

let SalaryInvoice = require('../models/salaryInvoice.model');

const Schema = mongoose.Schema;

const salaryRecordSchema = new Schema({
  // the basic pay of the employee per month
  basicPay: {
    type: Integer,
    required: true,
  },
  // total amount of the salary paid to the employee till date
  amountPaid:{
    type: Integer,
    required:true,
    },  
    // total amount of salary that needs to be paid and is due
  amountDue:{
    type: Integer,
    required:true,
    },  
    // the date at which the employee becomes eligible for next salary(joining date)
  dueDate: {
    type: Date,
    },
    // array of _id of salary Invoices
  salaryInvoiceIds:[{
    type:Schema.Types.ObjectId ,ref:"SalaryInvoice",
  }],

}, {
  timestamps: true,
});
  

const Login = mongoose.model('SalaryRecord', salaryRecordSchema);

module.exports = Login;