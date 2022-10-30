const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Student = require('../models/student.model');
let Section = require('../models/section.model');
let Class = require('../models/class.model');

const studentAttendanceSchema = new Schema({

    rollNumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

    student: {
        type: Schema.Types.ObjectId, ref: 'Student',
    },
    section: {
        type: Schema.Types.ObjectId, ref: 'Section',
    },
    classId: {
        type: Schema.Types.ObjectId, ref: 'Class',
    },
    status: {
        type: String,
        required: true,
    },
    entryDate: {
        type: Date,
    },

}, {
    timestamps: true,
});

const studentAttendance = mongoose.model('StudentAttendance', studentAttendanceSchema);
studentAttendance.createIndexes();
module.exports = studentAttendance;