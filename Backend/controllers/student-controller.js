let Student = require('../models/student.model');
let FeeRecord = require('../models/feeRecord.model');
let FeeList = require('../models/feeDetails.model');
let Class = require('../models/class.model')
let Section = require('../models/section.model');
const HttpError = require('../models/http-error');
let { cloudinary } = require("../utils/cloudinary");
const FeeDetails = require('../models/feeDetails.model');

const addStudent = async (req, res, next) => {
  console.log("In")
  try {

    //Student Attributes
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
    const sectionId = req.body.sectionId ? req.body.sectionId : null;
    const classYear = req.body.classYear? req.body.classYear : 0;
    const sectionName = req.body.sectionName ? req.body.sectionName : 'None';

    //Fee Record Attributes

    const securityFee = req.body.securityFee;
    const outStandingFees = 0;
    const otherFee = req.body.otherFee;
    const tuitionFee = req.body.tuitionFee;
    
    const feeList = req.body.feeList ? req.body.feeList : null;
    const scholarshipAmount = req.body.scholarshipAmount;
    let totalFee = 0;
    totalFee = Number(securityFee) + Number(tuitionFee) + Number(otherFee);
    console.log(totalFee)

    console.log("hit")
    const image = req.body.image || "";
    var uploadResponse;
    if (image !== "") {
      console.log("bef")
      uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'Students',
      })
      console.log("aft")
    }
    else {
      uploadResponse = { public_id: '' };
    }
    const feeRecord = new FeeRecord({
      feeList, outStandingFees, scholarshipAmount, totalFee, tuitionFee, securityFee, otherFee,
    })
    console.log("Before adding fee")

    let temp = await feeRecord.save()
    if(temp == null)
    {
      console.log("Fee Not Saved")
      res.status(401);
      return;
    }
    console.log("Fee Saved")
    
    var uploadResponse;
    if (image !== "") {
      uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'Students',

      })
      console.log(uploadResponse);
    }
    else {
      uploadResponse = { public_id: '' };
    }

    const newStudent = new Student({

      rollNumber, Age, firstName, lastName, guardianFirstName,
      guardianLastName, cnic, emailAddress, houseAddress, phoneNumber, sectionId, feeRecord, image: uploadResponse.public_id, classYear, sectionName
    });


    newStudent
      .save()
      .then(() => res.status(201).json({ message: "Student added!" }))
      .catch((err) => res.status(401).json("Error: " + err));

  } catch (err) {
    return next(new HttpError(err.message, 500));
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
    const rollNumber = { rollNumber: req.params.rollNumber };
    Student.findOne(rollNumber)
      .then((student) => res.status(201).json(student))
      .catch((err) => res.status(401).json("Error: " + err));
  }
  catch (err) {
    return next(new HttpError(err.message, 401));
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const rollNumber = { rollNumber: req.params.rollNumber };
    const updates = req.body;
    Student.findOneAndUpdate(rollNumber, updates)
      .then(() => res.json("Update operation called successfuly!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const rollNumber = req.params.rollNumber;
    var temp_student = await Student.findOne({ rollNumber });
    //Deleting the student from the class they blond to and updating the strength

    const class_query = {classYear : temp_student.classYear}
    const section_query = {sectionName : temp_student.sectionName}
    console.log(class_query)
    console.log(section_query)
    const tempOldClass = await Class.findOne(class_query).populate('sectionList');
    for (let i = 0; i < tempOldClass.sectionList.length; i++) {
        if (tempOldClass.sectionList[i].sectionName === temp_student.sectionName) {
            // console.log(tempOldClass.sectionList[i].sectionName)
            console.log("in the zone")
            const tempOldSection = await Section.findOne(section_query)  
            tempOldSection.strength = tempOldSection.strength -1;
            tempOldSection.save();           
    
            }
        }



    const public_id = temp_student.image;
    console.log("Public ID: " + public_id)
    const deleteResponse = await cloudinary.uploader
      .destroy(public_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log("hit")
    const tempFeeRecord = await FeeRecord.findById(temp_student.feeRecord).populate('feeList')
    
    const feeList = await FeeDetails.findById(tempFeeRecord.feeList);
    if(feeList != null)
    {
    const deletefeecheck = await FeeDetails.findById(feeList._id)
    }
    const deletecheck = await FeeRecord.findByIdAndDelete(tempFeeRecord._id);

    if (temp_student !== null) {
      Student.findByIdAndRemove(temp_student._id)
        .then(() => res.status(201).json("Delete operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
    
    else return res.status(404).json({ message: 'Student was not found\deleted' })
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};





exports.deleteStudent = deleteStudent;
exports.getStudentByRollNumber = getStudentByRollNumber;
exports.updateStudent = updateStudent;
exports.addStudent = addStudent;
exports.getAllStudents = getAllStudents;
