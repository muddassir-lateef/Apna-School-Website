const mongoose = require('mongoose');
let Admin = require('../models/admin.model');
let Teacher = require('../models/teacher.model');
let Staff = require('../models/staff.model');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password:{
    type: String,
    required:true,
  },
  // type of user which should always be one of the: Staff,Admin,Teacher
  type:{
    type: String,
    required:true,
  },  
  //_id of the admin from the Admin model
  admin:{
    type:Schema.Types.ObjectId ,ref:'Admin',
    
  },
  //_id of the staff from the Staff model
  staff:{
    type:Schema.Types.ObjectId ,ref:'Staff',
    
  },
  //_id of the teacher from the Teacher model
  teacher:{
    type:Schema.Types.ObjectId ,ref:'Teacher',
    
  },

}, {
  timestamps: true,
});
  

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;