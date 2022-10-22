const HttpError = require('../models/http-error');

let Student = require('../models/student.model');
let StudentAttendance = require('../models/studentAttendance.model');
let StudentAttendanceRegistry = require('../models/studentAttendanceRegistry.model');
let Class = require('../models/class.model');
let Section = require('../models/section.model');

const addStudentAttendance = async (req, res, next) => {
    try {
        const rollNumber = req.body.rollNumber;
        const status = req.body.status;
        const tempStudent = await Student.findOne({ rollNumber: rollNumber })
        const student = tempStudent._id;
        const tempclass = await Class.findOne({ classYear: tempStudent.classYear })
        const classId = tempclass._id;

        const tempSection = await Section.findOne({ classYear: tempStudent.classYear, sectionName: tempStudent.sectionName });
        const section = tempSection._id;
        let tempDate = req.body.date;

        if (tempDate == "today") {
            tempDate = new Date()
        }
        tempDate.setUTCHours(0, 0, 0, 0);
        let attendanceRegistry = await StudentAttendanceRegistry.findOne({ classsection: tempStudent.sectionName, classYear: tempStudent.classYear, entryDate: tempDate })
        console.log(attendanceRegistry)
        console.log(typeof attendanceRegistry)

        const attendanceEntry = new StudentAttendance({ rollNumber, student, section, classId, status, entryDate: tempDate });
        attendanceEntry.save()
            .then(() => {
                tempStudent.attendance = tempStudent.attendance || [];
                tempStudent.attendance.push(attendanceEntry._id);
                tempStudent.save()
                    .then(() => {
                        if (attendanceRegistry == null) {
                            attendanceRegistry = new StudentAttendanceRegistry({ section: tempStudent.sectionName, classYear: tempStudent.classYear, entryDate: tempDate })
                        }
                        attendanceRegistry.attendance = attendanceRegistry.attendance || [];
                        attendanceRegistry.attendance.push(attendanceEntry._id);
                        attendanceRegistry.save()
                            .then(() => {
                                res.json({ message: "Attendance entry added!", entry: attendanceEntry });


                            })
                            .catch(err => res.status(400).json('Error: ' + err));



                    })
                    .catch(err => res.status(400).json('Error: ' + err));

            })
            .catch(err => res.status(400).json('Error: ' + err));

    } catch (err) {
        return next(new HttpError(err.message, 500));
    }

}

const genClassAttendance = async (req, res, next) => {
    try {
        const tclassYear = req.body.classYear;
        const tsection = req.body.section;
        const image = req.body.image;

        let tempDate = new Date()
        tempDate.setUTCHours(0, 0, 0, 0);
        const tempSection = await Section.findOne({ classYear: tclassYear, sectionName: tsection }).populate('studentIdList');

        const tempclass = await Class.findOne({ classYear: tclassYear })

        let temp1Registry = await StudentAttendanceRegistry.findOne({ section: tsection, classYear: tclassYear, entryDate: tempDate })

        if (temp1Registry == null) {
            temp1Registry = new StudentAttendanceRegistry({ section: tsection, classYear: tclassYear, entryDate: tempDate })

            for (let i = 0; i < tempSection.studentIdList.length; i++) {

                const tempStudent = tempSection.studentIdList[i];
                const name = tempSection.studentIdList[i].firstName + " " + tempSection.studentIdList[i].lastName
                const student = tempStudent._id;
                const image = tempStudent.image;

                const rollNumber = tempStudent.rollNumber;
                let status = 'absent';
                const classId = tempclass._id;
                const section = tempSection._id;

                const attendanceEntry = new StudentAttendance({ rollNumber, name, image, student, section, classId, status, entryDate: tempDate });

                await attendanceEntry.save()
                    .catch(err => res.status(400).json('Error: ' + err));

                tempStudent.attendance = tempStudent.attendance || [];
                tempStudent.attendance.push(attendanceEntry._id);

                await tempStudent.save()
                    .then(() => {

                        temp1Registry.attendance = temp1Registry.attendance || [];
                        temp1Registry.attendance.push(attendanceEntry._id);


                    })
                    .catch(err => res.status(400).json('Error: ' + err));




            }

            temp1Registry.save()
                .catch(err => res.status(400).json('Error: ' + err));

        }


        res.status(201).json({ message: "Attendance generated!" });

    } catch (err) {
        return next(new HttpError(err.message, 500));
    }

}
const getAttendanceRegisteries = async (req, res, next) => {
    try {
        const tclassYear = req.body.classYear;
        const tsection = req.body.section;


        let temp1Registry = await StudentAttendanceRegistry.find({ section: tsection, classYear: tclassYear })
        let registries = []
        for (let i = 0; i < temp1Registry.length; i++) {
            let arr = []
            arr.push(temp1Registry[i].entryDate)
            var date = temp1Registry[i].entryDate;
            arr.push(date.toDateString().slice(4))
            registries.push(arr)

        }
        res.status(201).json({ message: "Registeries retrieved!", registry: registries });

    } catch (err) {
        return next(new HttpError(err.message, 500));
    }

}
const getAttendanceEnteries = async (req, res, next) => {
    try {
        const tclassYear = req.body.classYear;
        const tsection = req.body.section;
        const date = req.body.date;
        let tempDate = new Date(date)
        tempDate.setUTCHours(0, 0, 0, 0);
        let temp1Registry = await StudentAttendanceRegistry.findOne({ section: tsection, classYear: tclassYear, entryDate: tempDate }).populate('attendance')

        res.status(201).json({ message: "Enteries retrieved!", enteries: temp1Registry.attendance });

    } catch (err) {
        console.log(err)
        return next(new HttpError(err.message, 500));
    }

}
const setAttendanceEnteries = async (req, res, next) => {

    try {
        console.log("in")
        const attendance = req.body.attendance;

        for (let i = 0; i < attendance.length; i++) {


            const att_id = { _id: attendance[i]._id };
            StudentAttendance.findOneAndUpdate(att_id, { status: attendance[i].status })
                .catch((err) => res.status(400).json("Error: " + err));
        }
    } catch (err) {
        console.log(err)
        return next(new HttpError(err.message, 500));
    }

}

exports.addStudentAttendance = addStudentAttendance;
exports.genClassAttendance = genClassAttendance;
exports.getAttendanceRegisteries = getAttendanceRegisteries;
exports.getAttendanceEnteries = getAttendanceEnteries;
exports.setAttendanceEnteries = setAttendanceEnteries;
