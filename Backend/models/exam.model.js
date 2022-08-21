const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Class = require('../models/class.model');
let Marks = require('../models/marks.model');
let Teacher = require('../models/teacher.model');

const examSchema = new Schema({
  
  examID: {
    type: String,
    required: true
  },

  date:{
    type: Date,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  totalMarks:{
    type: Number,
    required: true,
  },

  venue: {
    type: String
  },
  
   //Class for which the exam is created
   classId:{
    type:Schema.Types.ObjectId ,ref:'Class',
  },

  //reference the teacher as well 
  teacherId:{
    type:Schema.Types.ObjectId ,ref:'Teacher',
  },

  //list of marks for all students 
  marks: [
    {
        type:Schema.Types.ObjectId ,ref:'Marks',
    }
  ]

},
 {
  timestamps: true,
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
