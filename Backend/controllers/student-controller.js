let Student = require('../models/student.model');
let FeeRecord = require('../models/feeRecord.model');
const HttpError = require('../models/http-error');
let { cloudinary } = require("../utils/cloudinary");

const addStudent = async(req, res, next) => {
  console.log("Hit")
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
        const feeList = req.body.feeList? req.body.feeList: null;
        const outStandingFees = 0;
        const sampleAttribute = 0;
        const image = req.body.image || "";
        var uploadResponse;
        if (image !== "") {
          console.log("here")
           uploadResponse = await cloudinary.uploader.upload(image,{
            upload_preset: 'Teachers',
        })
          console.log("there");
        }
        else{
          uploadResponse = {public_id: ''};
        }
        const feeRecord = new FeeRecord({
          feeList, outStandingFees,sampleAttribute
        })
       
       
        
        feeRecord.save();
        console.log(guardianFirstName);
        var uploadResponse;
        if (image !== "") {
          console.log("hit")
           uploadResponse = await cloudinary.uploader.upload(image,{
            upload_preset: 'Teachers',
            
        })
        console.log("hit")
          console.log(uploadResponse);
        }
        else{
          uploadResponse = {public_id: ''};
        }

        const newStudent = new Student({

            rollNumber, Age, firstName, lastName, guardianFirstName, 
<<<<<<< Updated upstream
            guardianLastName, cnic, emailAddress, houseAddress, phoneNumber, sectionId, feeRecord, image: uploadResponse.public_id,
=======
<<<<<<< HEAD
            guardianLastName, cnic, emailAddress, houseAddress,
            phoneNumber, sectionId, feeRecord, image : uploadResponse.public_id
=======
            guardianLastName, cnic, emailAddress, houseAddress, phoneNumber, sectionId, feeRecord, image: uploadResponse.public_id,
>>>>>>> c1385c3915fa3762dbbf1c2b1e1abddaf72eca40
>>>>>>> Stashed changes

                                    });


        newStudent
        .save()
        .then(() => res.status(201).json({ message: "Student added!"}))
        .catch((err) => res.status(401).json("Error: " + err));

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

const getStudentByRollNumber = async (req, res, next) => {
  try {
    const rollNumber={rollNumber:req.params.rollNumber};
    Student.findOne(rollNumber)
    .then((student) => res.status(201).json(student))
    .catch((err) => res.status(401).json("Error: " + err));
  }
  catch(err) {
    return next(new HttpError(err.message, 401));
  }
};

const updateStudent = async(req,res,next) => {
  try {
    const rollNumber ={rollNumber:req.params.rollNumber};
    const updates=req.body;
    Student.findOneAndUpdate(rollNumber,updates)
    .then(() => res.json("Update operation called successfuly!"))
    .catch((err) => res.status(400).json("Error: " + err));
} catch (err) {
  return next(new HttpError(err.message, 500));
}
};

const deleteStudent = async(req,res,next) => {
  try {
    const rollNumber={rollNumber:req.params.rollNumber};

    Student.findOneAndDelete(rollNumber)
    .then(() => res.json("Delete operation called successfuly!"))
    .catch((err) => res.status(400).json("Error: " + err));
} catch (err) {
  return next(new HttpError(err.message, 500));
}
}

exports.deleteStudent = deleteStudent;
exports.getStudentByRollNumber = getStudentByRollNumber;
exports.updateStudent = updateStudent;
exports.addStudent = addStudent;
exports.getAllStudents = getAllStudents;
