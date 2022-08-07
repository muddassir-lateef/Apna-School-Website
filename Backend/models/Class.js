const mongoose = require('mongoose')
const StudentSchema = require('./Student');

const ClassSchema = new mongoose.Schema({
    name: {
        type: Number,
        required: true,
        },
    section: {
        type:String,
        reqiured:true, 
        },
    studentList: {
        type: [StudentSchema],
        required:true
    }
});

const ClassModel = mongoose.model("Class",ClassSchema);
module.exports = ClassModel;