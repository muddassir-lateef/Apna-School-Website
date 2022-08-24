let Section = require('../models/section.model');
const HttpError = require('../models/http-error');

const addSection = async(req, res, next) => {
    try{
        const sectionName = req.body.sectionName;
        const strength = req.body.strength;
        //Lectures belonging to that section
        const lectures = req.body.lectures? req.body.lectures: null;
        //Students belonging to that section
        const studentIdList = req.body.studentIdList? req.body.studentIdList: null;
        //Section head, also knows as Class Teacher informally
        const sectionHead = req.body.sectionHead? req.body.sectionHead: null;

        const newSection= new Section({

           sectionName, strength, lectures, studentIdList, sectionHead

                                    });


        newSection
        .save()
        .then(() => res.json({ message: "Section added!", Section: newSection }))
        .catch((err) => res.status(400).json("Error: " + err));

    }catch(err){
        return next( new HttpError(err.message, 500));
    }
}

const getAllSections = async(req,res,next) => {
    try {
        Section.find()
        .populate("lectures", "studentIdList", "sectionHead")
        .then((sections) => res.status(201).json(sections))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch(err) {
        return next (new HttpError(err.message,500));
    }
    };
/*
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
    .catch((err) => res.status(400).json("Error: " + err));
  }
  catch(err) {
    return next(new HttpError(err.message, 500));
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
*/
exports.addSection = addSection;
exports.getAllSections = getAllSections;
