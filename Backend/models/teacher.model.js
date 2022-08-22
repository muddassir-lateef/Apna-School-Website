const mongoose = require('mongoose');
let SalaryRecord = require('../models/salaryRecord.model');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  

  firstName: {
    type: String,
    required: true,

  },
  lastName: {
    type: String,

  },
  age: {
    type: Number,

  },
    // _id of the salaryRecord associated with the employee

  salaryRecordId:{
    type:Schema.Types.ObjectId ,ref:"SalaryRecord",
  }
}, {
  timestamps: true,
});

const User = mongoose.model('Teacher', teacherSchema);

module.exports = User;