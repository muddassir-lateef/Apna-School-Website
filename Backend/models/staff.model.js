const mongoose = require('mongoose');
let SalaryRecord = require('../models/salaryRecord.model');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  

  firstName: {
    type: String,
    required: true,

  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Integer,
    required: true,
  },
  // _id of the salaryRecord associated with the employee
  salaryRecordId:{
    type:Schema.Types.ObjectId ,ref:"SalaryRecord",
  }
}, {
  timestamps: true,
});

const User = mongoose.model('Staff', staffSchema);

module.exports = User;