const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let StudentAttendance = require('../models/studentAttendance.model');

const studentAttendanceRegistrySchema = new Schema({

    section: {
        type: String,
    },
    classYear: {
        type: Number,
    },
    entryDate:{
        type: Date,
    },

    attendance:
        [{
            type: Schema.Types.ObjectId, ref: 'StudentAttendance',
        }],

}, {
    timestamps: true,
});

const studentAttendanceRegistry = mongoose.model('StudentAttendanceRegistry', studentAttendanceRegistrySchema);
studentAttendanceRegistry.createIndexes();
module.exports = studentAttendanceRegistry;