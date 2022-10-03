const mongoose = require('mongoose');
let Student = require('../models/student.model');
let Lecture = require('../models/lecture.model');
let Teacher = require('../models/teacher.model');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  //The basic section (1A / 2B / 3C) The Number before Alphabet has to be added on runtime by the servirside itself
  sectionName: {
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
      type:Schema.Types.ObjectId ,
      ref:'Lecture',
    }
  ],
  classYear : {
    
      type :Number,
      required : true
    
  },
  //List of IDs refering to Students belonging to the section
  studentIdList : [
    {
      type:Schema.Types.ObjectId ,
      ref:'Student',
    }
  ],
  //Reference to ID of Section Head
  sectionHead : {
    type:Schema.Types.ObjectId ,
    ref:'Teacher',
  }
},
 {
  timestamps: true,
});

const Section = mongoose.model('Section', sectionSchema);
Section.createIndexes();
module.exports = Section;
