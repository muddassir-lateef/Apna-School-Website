const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  date: {
    type: Date
  },

  topic: {
    type: String,
    required: true
  }

},
 {
  timestamps: true,
});

const Lecture = mongoose.model('Lecture', lectureSchema);
Lecture.createIndexes();
module.exports = Lecture;
