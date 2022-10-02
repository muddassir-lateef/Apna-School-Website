const mongoose = require('mongoose');
let SalaryRecord = require('../models/salaryRecord.model');
const Schema = mongoose.Schema;
let Section = require('../models/section.model');

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
  image: {
    type: String,
  },
    // _id of the salaryRecord associated with the employee

  salaryRecordId:{
    type:Schema.Types.ObjectId ,ref:"SalaryRecord",
  },

  sections: [
    {
      type:Schema.Types.ObjectId ,ref:"Section",
    }
  ]

}, {
  timestamps: true,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
Teacher.createIndexes();
module.exports = Teacher;