const mongoose = require("mongoose");

const Students = mongoose.model('Students', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        },
    age: {
        type:Number,
        reqiured:true, 
        },
    guardianName: {
        type:String,
        required:true,
    },
    contactNumber: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    class: {
        type:String,
        required:true,
    }
}));

const Class = mongoose.model('Class', new mongoose.Schema({
    id : {
        type: String,
        required: true,
        },
    section: {
        type:Number,
        reqiured:true, 
        },
    students_list: 
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Students'
        }
    
}));

module.exports = {Students, Class}