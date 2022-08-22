const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  

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

}, {
  timestamps: true,
});

const User = mongoose.model('Admin', adminSchema);

module.exports = User;