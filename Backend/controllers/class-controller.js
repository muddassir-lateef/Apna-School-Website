const HttpError = require('../models/http-error');
let Section = require('../models/section.model');
let Student = require('../models/student.model');
let Class = require('../models/class.model');
let Teacher = require('../models/teacher.model');


const getClass = async (req, res, next) => {
    try {
        console.log("hit")
      const classYear={classYear:req.params.classYear};
      Class.findOne(classYear)
      .then((tempclass) => res.status(201).json(tempclass))
      .catch((err) => res.status(401).json("Error: " + err));
    }
    catch(err) {
      return next(new HttpError(err.message, 401));
    }
  };


const addClass = async(req, res, next) => {
    try{
        const classYear = req.body.classYear;
        const classStrength = req.body.classtrength? req.body.classStrength : 0;
        const noOfSections = req.body.noOfSections? req.body.noOfSections : 0;
        //Lectures belonging to that section
        const sectionList = req.body.sectionList? req.body.sectionList: null;

        const newClass= new Class({

           classYear, classStrength, noOfSections, sectionList

                                    });


        newClass
        .save()
        .then(() => res.status(201).json({ message: "Class added!",Class: newClass }))
        .catch((err) => res.status(401).json("Error: " + err));

    }catch(err){
        return next( new HttpError(err.message, 500));
    }
};
const addNewSectionToClass = async(req, res, next) => {

        const sectionName = req.body.sectionName;
        const strength = req.body.strength? req.body.strength: 0;
        //Lectures belonging to that section
        const lectures = req.body.lectures? req.body.lectures: null;
        //Students belonging to that section
        const studentIdList = req.body.studentIdList? req.body.studentIdList: null;
        //Section head, also knows as Class Teacher informally
        const sectionHead = req.body.sectionHead? req.body.sectionHead: null;

        const newSection= new Section({

           sectionName, strength, lectures, studentIdList, sectionHead

                                    });


        newSection.save();

        const class_query = {classYear : req.body.classYear}
        const temp_class = await Class.findOne(class_query)
        console.log(temp_class)
     if(temp_class.noOfSections !== null)
     {
     temp_class.noOfSections = temp_class.noOfSections + 1;
     }

        temp_class.sectionList = temp_class.sectionList || [];
        temp_class.sectionList.push(newSection._id);
        temp_class.save()
      .then(() => res.json({ message: "New Section has been added to class", Class: temp_class }))
      .catch((err) => res.status(400).json("Error: " + err));
};

const getAllClasses = async (req,res,next) => {
    try {
        Class.find().populate('sectionList')
        .then((classes) => res.status(201).json(classes))
        .catch((err) => res.status(401).json("Error: " + err));
    } catch(err) {
        return next (new HttpError(err.message,500));
    }
    };

const getAllSectionsInClass = async(req ,res , next) => {
    const class_query = {classYear:req.params.classYear}
    const temp_class = await Class.findOne(class_query).populate('sectionList');
    temp_class.sectionList = temp_class.sectionList || [];
    res.status(201).json(temp_class.sectionList);
    return
};

const assignTeacherToSection = async(req, res, next) => {
    let success = -1;
    const class_year = req.body.classYear;
    const section = req.body.section;
    const teacherUsername = req.body.username;
    const temp_teacher = await Teacher.findOne({ username: teacherUsername });

    const temp_class = await Class.findOne({classYear: class_year}).populate('sectionList');

    if (temp_teacher !== null) {
        if (temp_class.sectionList !== null) {
            for (let i = 0; i < temp_class.sectionList.length; i++) {
                if (temp_class.sectionList[i].sectionName === section) {
                    temp_class.sectionList[i].sectionHead = temp_teacher._id;
                    const temp_section = await Section.findOne({_id: temp_class.sectionList[i]._id})
                    temp_section.sectionHead = temp_teacher._id;
                    await temp_section.save();
                    if (temp_teacher.sections.find(val => val == temp_class.sectionList[i]._id) === null)
                        temp_teacher.sections.push(temp_class.sectionList[i]._id);
                    success = 1;
                }
            }
        }
    }

    if (success === 1){
        await temp_teacher.save()
        const err = await temp_class.save().catch(err => err)
        .then(() => res.status(200).json({ message: "Teacher has been assigned to class", Class: temp_class }))
        .catch((err) => res.status(400).json("Error: " + err));
       
    }
    else{
        res.status(400).json({message: "Teacher was NOT assigned"});
    }

}

exports.getAllSectionsInClass = getAllSectionsInClass;
exports.getAllClasses = getAllClasses;
exports.addClass = addClass;
exports.addNewSectionToClass = addNewSectionToClass;
exports.getClass = getClass;
exports.assignTeacherToSection = assignTeacherToSection;
