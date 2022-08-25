const HttpError = require('../models/http-error');
let Section = require('../models/section.model');
let Student = require('../models/student.model');


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
};

const addStudentToSection = async(req,res,next) => {
  const section_query = {sectionName : req.body.sectionName};
  const temp_section = await Section.findOne(section_query).populate('lectures', 'studentIdList');
  const student_query = {rollNumber : req.body.rollNumber}
  const temp_student = await Student.findOne(student_query)
  if (temp_section == null){
    return next(new HttpError("Section could not be found", 409));
}
    temp_section.studentIdList = temp_section.studentIdList || [];
  temp_section.studentIdList.push(temp_student._id);
  temp_section
  .save()
      .then(() => res.json({ message: "Student added!", Section: temp_section }))
      .catch((err) => res.status(400).json("Error: " + err));
};


const getAllSections = async(req,res,next) => {
    try {
        Section.find()
        .populate('lectures', 'studentIdList')
        .then((sections) => res.status(201).json(sections))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch(err) {
        return next (new HttpError(err.message,500));
    }
    };

const getSectionById = async(req,res,next) => {
    const id = new ObjectId(req.params.sectionName);
    try {
        Section.findById(id)
          .populate('lectures', 'studentIdList')
          .then((sections) => res.status(201).json(sections))
          .catch((err) => res.status(400).json("Error: " + err));
      } catch (err) {
        return next(new HttpError(err.message, 500));
      }
};


exports.getSectionById = getSectionById;
exports.addStudentToSection = addStudentToSection;
exports.addSection = addSection;
exports.getAllSections = getAllSections;
