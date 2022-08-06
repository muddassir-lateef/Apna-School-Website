const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        },
    age: {
        type:Number,
        reqiured:true, 
        },
    username: {
        type:String,
        required:true,
    },
});

const AdminModel = mongoose.model("Admins",AdminSchema);
module.exports = AdminModel;