const HttpError = require('../models/http-error');
let Section = require('../models/section.model');
let Student = require('../models/student.model');
let Class = require('../models/class.model');




const addStudentToSection = async (req, res, next) => {
    const student_query = { rollNumber: req.body.rollNumber }
    console.log(req.body.rollNumber)

    const tempStudent = await Student.findOne(student_query);

    if (tempStudent.classYear === req.body.classYear) {
        if (tempStudent.sectionName === req.body.newSection) {
            res.status(401).json(tempStudent)
            console.log("Student already in this class")
            return

        }
    }
    const new_class_query = { classYear: req.body.classYear }
    const new_section_query = { sectionName: req.body.newSection }
    const tempNewClass = await Class.findOne(new_class_query).populate('sectionList');
    for (let i = 0; i < tempNewClass.sectionList.length; i++) {
        if (tempNewClass.sectionList[i].sectionName === req.body.newSection) {
            console.log(tempNewClass.sectionList[i].sectionName)
            const tempNewSection = await Section.findOne(new_section_query).populate('studentIdList');

            tempNewSection.studentIdList = tempNewSection.studentIdList || [];
            tempNewSection.studentIdList.push(tempStudent._id);
            tempNewSection.strength = tempNewSection.strength + 1;
            tempStudent.classYear = req.body.classYear;
            tempStudent.sectionName = req.body.newSection;
            tempStudent.save();
            console.log("added")
            tempNewSection
                .save()
                .then(res.status(201))
            return;
        }
    }
    res.status(401);
    return;

};


const changeStudentSection = async (req, res, next) => {

    const student_query = { rollNumber: req.body.rollNumber }
    const tempStudent = await Student.findOne(student_query);

    //Check for same new and old values
    if(tempStudent == null || tempStudent === 'undefined' || req.body.rollNumber === 0)
    {
        res.status(401).json(tempStudent)
        return
    }
    
        if (tempStudent.classYear === req.body.classYear) {
            if (tempStudent.sectionName === req.body.sectionName) {
                res.status(401).json(tempStudent)
                console.log("Student already in this class")
                return
            }
        }
        console.log(req.body.classYear)
        console.log(req.body.sectionName)
    //Check for null values
    console.log(tempStudent.classYear)
    if (tempStudent.classYear !== 0) {
        if (tempStudent.sectionName !== 'None') {
            console.log("in")
            const old_class_query = { classYear: tempStudent.classYear };
            const old_section_query = { secionname: tempStudent.sectionName };
            console.log(old_class_query)
            console.log(old_section_query)
            const tempOldClass = await Class.findOne(old_class_query).populate('sectionList');
            console.log(tempOldClass)
            console.log("before loop")
            for (let i = 0; i < tempOldClass.sectionList.length; i++) {
                console.log(i)
                if (tempOldClass.sectionList[i].sectionName === tempStudent.sectionName) {
                    console.log("Section matched")
                    // console.log(tempOldClass.sectionList[i].sectionName)
                    const tempOldSection = await Section.findById(tempOldClass.sectionList[i]._id).populate('studentIdList');
                    for (let j = 0; j < tempOldSection.studentIdList.length; j++) {
                        if (tempOldSection.studentIdList[j].rollNumber === tempStudent.rollNumber) {
                            tempOldSection.studentIdList.splice(j, 1);
                            console.log("popped from")
                            tempOldSection.strength = tempOldSection.strength - 1;
                            tempOldSection
                                .save()
                        }
                    }
                }
            }
        }
    }

    console.log("second half")

    const new_class_query = { classYear: req.body.classYear }
    const tempNewClass = await Class.findOne(new_class_query).populate('sectionList');
    for (let i = 0; i < tempNewClass.sectionList.length; i++) {
        console.log(i)
        if (tempNewClass.sectionList[i].sectionName === req.body.sectionName) {
            const tempNewSection = await Section.findById(tempNewClass.sectionList[i]._id).populate('studentIdList');
            tempNewSection.studentIdList = tempNewSection.studentIdList || [];
            tempNewSection.studentIdList.push(tempStudent._id);
            tempNewSection.strength = tempNewSection.strength + 1;
            tempStudent.classYear = req.body.classYear;
            tempStudent.sectionName = req.body.sectionName;
            tempStudent.save();
            console.log("added")
            tempNewSection
                .save()
                .then(res.status(201).json(tempStudent))
            return
            console.log("after save")
            return
        }
    }
    return;
}



const getAllSections = async (req, res, next) => {
    try {
        Section.find()
            .populate('lectures', 'studentIdList')
            .then((sections) => res.status(201).json(sections))
            .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
        return next(new HttpError(err.message, 500));
    }
};

const getSectionById = async (req, res, next) => {
    try {
        const section_query = { sectionName: req.body.sectionName };
        Section.findOne(section_query)
            .then((section) => res.status(201).json(section))
            .catch((err) => res.status(401).json("Error: " + err));
    }
    catch (err) {
        return next(new HttpError(err.message, 401));
    }
};

const getAllStudentsInSection = async (req, res, next) => {
    const class_query = { classYear: req.body.classYear }
    console.log(req.body.sectionName)
    console.log(req.body.classYear)
    console.log("/-----------------------------------------/")
    
    const temp_class = await Class.findOne(class_query).populate('sectionList')
    if (temp_class === null) {
        res.status(401)
        return;
    }
    temp_class.sectionList = temp_class.sectionList || [];
    for (let i = 0; i < temp_class.sectionList.length; i++) {
        if (temp_class.sectionList[i].sectionName === req.body.sectionName) {
            console.log("found")
            const temp_section = await Section.findById(temp_class.sectionList[i]._id).populate('studentIdList').populate('sectionHead');
            console.log(temp_section)
            res.status(201).json(temp_section);
            return
        }

    }
    res.status(401);
    return

};


const removeStudentFromSection = async (req, res, next) => {
    console.log("values")
    console.log(req.body.rollNumber)
    console.log(req.body.sectionName)
    console.log(req.body.classYear)
    const student_query = { rollNumber: req.body.rollNumber };
    const class_query = { classYear: req.body.classYear };
    const section_query = { sectionName: req.body.sectionName, classYear : req.body.classYear };

    const tempStudent = await Student.findOne(student_query);
     console.log(tempStudent)

    const tempOldClass = await Class.findOne(class_query).populate('sectionList');
    for (let i = 0; i < tempOldClass.sectionList.length; i++) {
        if (tempOldClass.sectionList[i].sectionName === req.body.sectionName) {
            // console.log(tempOldClass.sectionList[i].sectionName)
            const tempOldSection = await Section.findOne(section_query).populate('studentIdList');
            console.log(tempOldSection)
            for (let j = 0; j < tempOldSection.studentIdList.length; j++) {
                console.log("In 1st loop")
                console.log(tempOldSection.studentIdList[j].rollNumber)
                if (tempOldSection.studentIdList[j].rollNumber === req.body.rollNumber) {
                    console.log("In loop")
                    tempOldSection.studentIdList.splice(j, 1);
                    console.log("popped from")
                    console.log(tempOldSection.studentIdList)
                    tempOldSection.strength = tempOldSection.strength - 1;
                    tempStudent.classYear = 0;
                    tempStudent.sectionName = 'None';
                    tempStudent.save();
                    tempOldSection
                        .save() .then(res.status(201).json(tempStudent))
                    return;
                    
                }
            }
        }
    }
    res.status(401)
    return;
}


const getOneSection = async (req, res, next) => {
    try {
        const section_query = { _id: req.params.id };
        Section.findOne(section_query)
            .then((section) => res.status(201).json(section))
            .catch((err) => res.status(401).json("Error: " + err));
    }
    catch (err) {
        return next(new HttpError(err.message, 401));
    }
};

exports.removeStudentFromSection = removeStudentFromSection
exports.changeStudentSection = changeStudentSection;
exports.getAllStudentsInSection = getAllStudentsInSection;
exports.getSectionById = getSectionById;
exports.addStudentToSection = addStudentToSection;
exports.getAllSections = getAllSections;
exports.getOneSection = getOneSection
