const mongoose = require('mongoose');
let SalaryRecord = require('../models/salaryRecord.model');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
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

const Teacher = mongoose.model('Teacher', teacherSchema);
Teacher.createIndexes();
module.exports = Teacher;