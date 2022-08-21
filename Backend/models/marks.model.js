const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Student = require('../models/student.model');
let Exam = require('../models/exam.model');

const marksSchema = new Schema({
  
  marksID: {
    type: String,  
    required: true
  },

  obtainedMarks:{
    type: Number,
    required: true
  },

  studentId:{
    type:Schema.Types.ObjectId ,ref:'Student'
    
  },

  //Exam to which the marks belong
  examId:{
    type:Schema.Types.ObjectId ,ref:'Exam',
  }

},
 {
  timestamps: true
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
