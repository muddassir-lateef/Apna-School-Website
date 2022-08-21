const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Exam = require('../models/exam.model');

const calendarSchema = new Schema({
  
  celandarID: {
    type: String,
    required: true,
  },

  //Calendar for the year
  year:{
    type: Number,
    required: true,
    unique:true
  },

  //events in that year
  events : [
    {
      title: String,
      date: Date,
      budget: Number,
      wasHoliday: Boolean,
    }
  ],

  //calendar has a list of exams
  exams: [
    {
      type:Schema.Types.ObjectId ,ref:Exam
    }
  ] 
},
 {
  timestamps: true,
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
