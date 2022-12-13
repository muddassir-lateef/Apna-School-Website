let Student = require('../models/student.model');
let FeeRecord = require('../models/feeRecord.model');
let FeeList = require('../models/feeDetails.model');
let Class = require('../models/class.model')
let Section = require('../models/section.model');
const HttpError = require('../models/http-error');
let { cloudinary } = require("../utils/cloudinary");
const FeeDetails = require('../models/feeDetails.model');
const { default: mongoose } = require('mongoose');

const addStudent = async (req, res, next) => {
  console.log("In")
  try {

    //Student Attributes
    const firstName = req.body.firstName;
    const Age = req.body.Age;
    const lastName = req.body.lastName;
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

    const outStandingFees = 0;
    const otherFee = req.body.otherFee ? req.body.otherFee : 0;
    const tuitionFee = req.body.tuitionFee ? req.body.tuitionFee : 0;
    
    const feeList = req.body.feeList ? req.body.feeList : null;
    const scholarshipAmount = req.body.scholarshipAmount ? req.body.scholarshipAmount : 0;
 
    const totalFee = Number(tuitionFee) + Number(otherFee) - Number(scholarshipAmount);
    console.log(totalFee)
    console.log(tuitionFee)
    console.log(otherFee)
    console.log(scholarshipAmount)
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
    console.log(totalFee)
    console.log(tuitionFee)
    const feeRecord = new FeeRecord({
      feeList, outStandingFees, scholarshipAmount, totalFee, tuitionFee,  otherFee,
    })
    console.log("Before adding fee")
    console.log(feeRecord)

    const temp = feeRecord.save()
    console.log("fee added")
    console.log(feeRecord._id)
    console.log("fee added")
    //--//
    const tempFeeRecord = await FeeRecord.findOne();
    var d = new Date(tempFeeRecord.createdAt)
    var year = d.getFullYear();
     var strYear = String(year)
     let tempYear = "";
     for(let i=0;i<4;i++)
     {
       if(i > 1)
         {
       tempYear = tempYear + strYear[i];
     }
   }
   let finalYear = Number(tempYear)
   const studentsList = await Student.find();
   
   let rollFinalYear = finalYear * 10000;
   console.log("The Year")
   console.log(rollFinalYear)
   let highestRollNumber = rollFinalYear;
   for(let j = 0; j < studentsList.length; j++)
   {
   if(studentsList[j].rollNumber > highestRollNumber)
   {
     highestRollNumber = studentsList[j].rollNumber;
   }
   }
   console.log("The highest rollNumber")
   console.log(highestRollNumber)
   
   
   console.log("Getting new highest rollNumber")
   rollFinalYear = highestRollNumber + 1;
   const rollNumber = rollFinalYear
   console.log(rollNumber)
  //--//
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
  console.log("In function")
  try {
    Student.find()
      .populate('feeRecord')
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
    console.log("in backend")
    const rollNumber = req.body.rollNumber;
    console.log(rollNumber)
    var temp_Student = await Student.findOne({ rollNumber : rollNumber });
    console.log("student found")
    console.log(temp_Student)

    const image = req.body.image || "";
    var uploadResponse;
    if (image !== "") {
      uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "Students",
      });
      console.log(uploadResponse);
      //delete last image
      console.log("Teacher: " + temp_Student);
      const public_id = temp_Student.image;
      console.log("Public ID: " + public_id);
      const deleteResponse = await cloudinary.uploader
        .destroy(public_id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      uploadResponse = { public_id: "" };
    }

    const updates = {
      rollNumber : req.body.rollNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Age : req.body.Age,
      guardianFirstName : req.body.guardianFirstName,
      guardianLastName : req.body.guardianLastName,
      cnic : req.body.cnic,
      phoneNumber : req.body.phoneNumber,
      houseAddress : req.body.houseAddress,
      emailAddress : req.body.emailAddress
    };

    if (image !== "" && uploadResponse.public_id !== "") {
      updates.image = uploadResponse.public_id;
    }

    Student.findOneAndUpdate({rollNumber}, updates)
      .then(() => res.status(201).json("Update operation called successfuly!"))
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
    const tempOldClass = await Section.findOne({classYear : temp_student.classYear , sectionName : temp_student.sectionName})
    console.log("The class")
    console.log(tempOldClass)
    if(tempOldClass !== null)
    {
    tempOldClass.strength = tempOldClass.strength - 1;
    const check = await tempOldClass.save();
    }
    
   
    const public_id = temp_student.image;
    console.log("Public ID: " + public_id)
    const deleteResponse = await cloudinary.uploader
      .destroy(public_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  
    const tempFeeRecord = await FeeRecord.findById(temp_student.feeRecord).populate('feeList')
    console.log(tempFeeRecord)

    if(tempFeeRecord.feeList !== null)
    {
      console.log("Null")
    
    console.log("Fee list not null")
      for (let i=0; i< tempFeeRecord.feeList.length; i++)
      {
        console.log("in loop")
        console.log(tempFeeRecord.feeList[i])
    const deletefeecheck = await FeeDetails.findByIdAndDelete(tempFeeRecord.feeList[i]._id)
    
      }
    }
    const deletecheck = await FeeRecord.findByIdAndDelete(tempFeeRecord._id);
      console.log("Fee record deleted")
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

const dateTest = async (req,res,next) => {
  const tempFeeRecord = await FeeRecord.findOne();
 var d = new Date(tempFeeRecord.createdAt)
 var year = d.getFullYear();
  var strYear = String(year)
  let tempYear = "";
  for(let i=0;i<4;i++)
  {
    if(i > 1)
      {
    tempYear = tempYear + strYear[i];
  }
}
let finalYear = Number(tempYear)
const studentsList = await Student.find();

let rollFinalYear = finalYear * 100000;
console.log("The Year")
console.log(rollFinalYear)
let highestRollNumber = rollFinalYear;
for(let j = 0; j < studentsList.length; j++)
{
if(studentsList[j].rollNumber > highestRollNumber)
{
  highestRollNumber = studentsList[j].rollNumber;
}
}
console.log("The highest rollNumber")
console.log(highestRollNumber)


console.log("Getting new highest rollNumber")
rollFinalYear = highestRollNumber + 1;
  res.status(201).json(rollFinalYear)
}

const getStudentsForFee = async(req,res,next) => {
const classYear = req.body.classYear;
const sectionName = req.body.sectionName;

if(classYear == "All")
{
  const tempStudentList = await Student.find();
  res.status(201).json(tempStudentList)
  return
}
if(classYear !== "All")
{
  if(sectionName === "All")
  {
    const tempStudentList = await Student.find({classYear : classYear})
    res.status(201).json(tempStudentList)
    return
  }
  if(sectionName !== "All")
  {
    const tempStudentList = await Student.find({classYear : classYear, sectionName : sectionName});
    res.status(201).json(tempStudentList)
    return
  }
}
res.status(401).json(1)
return
}
exports.dateTest = dateTest;
exports.deleteStudent = deleteStudent;
exports.getStudentByRollNumber = getStudentByRollNumber;
exports.updateStudent = updateStudent;
exports.addStudent = addStudent;
exports.getAllStudents = getAllStudents;
exports.getStudentsForFee = getStudentsForFee