const mongoose = require('mongoose');
let Section = require('../models/section.model');
let FeeRecord = require('../models/feeRecord.model')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  //Unique for all students
  rollNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  //SelfExplanatory
  Age:{
    type: Number,
    required: true,
  },
  //SelfExplanatory
  firstName: {
    type: String,
    required: true,
  //SelfExplanatory
  },
  lastName: {
    type: String,
    required: true,
  //SelfExplanatory
  },
  guardianFirstName: {
    type: String,
    required: true,
  //SelfExplanatory
  },
  guardianLastName: {
    type: String,
    required: true,
  },
  //SelfExplanatory
  cnic: {
    type: String,
    required: true,
  //SelfExplanatory
  },
  emailAddress: {
    type: String,
    required: true,
  },
  //SelfExplanatory
  houseAddress: {
    type: String,
    required: true,
  //SelfExplanatory
  },
  phoneNumber: {
    type: String,
    required: true,
  //Reference to the ID of section the student belongs too
  },
  sectionId:{
    type:Schema.Types.ObjectId ,ref:"Section",
    
  },
  feeRecord:{
    type:Schema.Types.ObjectId ,ref:'FeeRecord',
    
  },

}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;