const HttpError = require('../models/http-error');
let Section = require('../models/section.model');
let Student = require('../models/student.model');
let Class = require('../models/class.model');

const addClass = async(req, res, next) => {
    try{
        const classYear = req.body.classYear;
        const classStrength = req.body.classtrength;
        //Lectures belonging to that section
        const sectionList = req.body.sectionList? req.body.sectionList: null;

        const newClass= new Class({

           classYear, classStrength, sectionList

                                    });


        newClass
        .save()
        .then(() => res.json({ message: "Class added!",Class: newClass }))
        .catch((err) => res.status(400).json("Error: " + err));

    }catch(err){
        return next( new HttpError(err.message, 500));
    }
};
const addNewSectionToClass = async(req, res, next) => {

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


        newSection.save();

        const class_query = {classYear : req.body.classYear}
        const temp_class = await Class.findOne(class_query)

        temp_class.sectionList = temp_class.sectionList || [];
        temp_class.sectionList.push(newSection._id);
        temp_class.save()
      .then(() => res.json({ message: "New Section has been added to class", Class: temp_class }))
      .catch((err) => res.status(400).json("Error: " + err));
};

const getAllClasses = async (req,res,next) => {
    try {
        Class.find()
        .then((classes) => res.status(201).json(classes))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch(err) {
        return next (new HttpError(err.message,500));
    }
    };

const getAllSectionsInClass = async(req ,res , next) => {
    const class_query = {classYear : req.body.classYear};

    const temp_class = await Class.findOne(class_query);
    const temp_section_list = temp_class.sectionList;
    res.json(temp_section_list);
};

exports.getAllSectionsInClass = getAllSectionsInClass;
exports.getAllClasses = getAllClasses;
exports.addClass = addClass;
exports.addNewSectionToClass = addNewSectionToClass;

