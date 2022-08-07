const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
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
});

const StudentModel= mongoose.model("Students",StudentSchema);
module.exports = StudentModel;