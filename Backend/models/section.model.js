const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Student = require('../models/student.model');
const sectionSchema = new Schema({
  //The basic section (A/B/C or 1/2/3)
  sectionID: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  //Total Number of Students
  strength:{
    type: Number,
    required: true,

  },
  //Subjects taught to class, This will have a list of "Lecture" Reference Objects
  //but that is not made yet
  lectures : [
    {
        type: String,
        required: true

    }
  ],
  //List of IDs refering to Students belonging to the section
  studentIdList : [
    {
        type:Schema.Types.ObjectId ,ref:Student,
    }
  ],
  //Reference to ID of Section Head
  sectionhead : {
    type:String,
  }
},
 {
  timestamps: true,
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;