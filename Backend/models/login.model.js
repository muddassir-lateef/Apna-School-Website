const mongoose = require('mongoose');
let User = require('../models/user.model');

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
  userid:{
    type:Schema.Types.ObjectId ,ref:"User",
    
  },
}, {
  timestamps: true,
});
  

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;