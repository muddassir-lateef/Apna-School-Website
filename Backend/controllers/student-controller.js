let Student = require('../models/student.model');
const HttpError = require('../models/http-error');

const addStudent = async(req, res, next) => {
    try{
        const firstName = req.body.firstName;
        const Age = req.body.Age;
        const lastName = req.body.lastName;
        const rollNumber = req.body.rollNumber;
        const guardianFirstName = req.body.guardianFirstName;
        const guardianLastName = req.body.guardianLastName;
        const cnic = req.body.cnic;
        const houseAddress = req.body.houseAddress;
        const phoneNumber = req.body.phoneNumber;
        const emailAddress = req.body.emailAddress;
        const sectionId = req.body.sectionId? req.body.sectionId: null;
        const feeRecord = req.body.feeRecord? req.body.feeRecord: null;

        const newStudent= new Student({

            rollNumber, Age, firstName, lastName, guardianFirstName, 
            guardianLastName, cnic, emailAddress, houseAddress, phoneNumber, sectionId, feeRecord

                                    });


        newStudent
        .save()
        .then(() => res.json({ message: "Student added!", Student: newStudent }))
        .catch((err) => res.status(400).json("Error: " + err));

    }catch(err){
        return next( new HttpError(err.message, 500));
    }

}

const getAllStudents = async (req, res, next) => {
  try {
    Student.find()
      .populate("sectionId", "feeRecord")
      .then((students) => res.status(201).json(students))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};



exports.addStudent = addStudent;
exports.getAllStudents = getAllStudents;
