const HttpError = require('../models/http-error');
let Section = require('../models/section.model');
let Student = require('../models/student.model');
let Class = require('../models/class.model');




const addStudentToSection = async(req,res,next) => {
  const section_query = {sectionName : req.body.sectionName};
  const temp_section = await Section.findOne(section_query).populate('lectures', 'studentIdList');
  const student_query = {rollNumber : req.body.rollNumber}
  const temp_student = await Student.findOne(student_query)

  if (temp_section == null){
    return next(new HttpError("Section could not be found", 401));
}
  temp_section.studentIdList = temp_section.studentIdList || [];
  temp_section.studentIdList.push(temp_student._id);
  temp_section.strength = temp_section.strength + 1;
  temp_section
  .save()
      .then(() => res.json({ message: "Student added!", Section: temp_section }))
      .catch((err) => res.status(400).json("Error: " + err));
};


const changeStudentSection = async(req,res,next) => {
    //All the queries, maybe bad coding practice but anyway
    const old_class_query = {classYear : req.body.oldClass}
    const new_class_query = {classYear : req.body.newClass}
    const old_section_query = {sectionName : req.body.oldSection}
    const new_section_query = {sectionName : req.body.newSection}
    const student_query = {rollNumber : req.body.rollNumber}
    //First things first, Find the student
    const tempStudent = await Student.findOne(student_query);
   // console.log(tempStudent)

    const tempOldClass = await Class.findOne(old_class_query).populate('sectionList');


    res.status(201).json(tempOldClass.sectionList)

    for(let i=0;i<tempOldClass.sectionList.length;i++)
    {
        if(tempOldClass.sectionList[i].sectionName === req.body.oldSection)
        {
           // console.log(tempOldClass.sectionList[i].sectionName)
            const tempOldSection = await Section.findOne(old_section_query).populate('studentIdList');
            for(let j=0;j<tempOldSection.studentIdList.length;j++)
            {
                if(tempOldSection.studentIdList[j].rollNumber === tempStudent.rollNumber)
                {
                    tempOldSection.studentIdList.splice(j,1);
                    console.log("popped from")
                    tempOldSection.strength = tempOldSection.strength - 1;
                     console.log("added")
                     tempOldSection
                    .save()
                }
            }
        }
    }
    console.log("------------------------------------SECTION CHECK -----------------------------------------------")
    const tempNewClass = await Class.findOne(new_class_query).populate('sectionList');
    for(let i=0;i<tempNewClass.sectionList.length;i++)
    {
        if(tempNewClass.sectionList[i].sectionName === req.body.newSection)
        {
           console.log(tempNewClass.sectionList[i].sectionName)
            const tempNewSection = await Section.findOne(new_section_query).populate('studentIdList');
            console.log(tempNewSection)

            tempNewSection.studentIdList = tempNewSection.studentIdList || [];
            tempNewSection.studentIdList.push(tempStudent._id);
            tempNewSection.strength = tempNewSection.strength + 1;
            console.log("added")
            tempNewSection
            .save()
        }
    }
    return;
}



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
    try {
        const section_query={sectionName:req.body.sectionName};
        Section.findOne(section_query)
        .then((section) => res.status(201).json(section))
        .catch((err) => res.status(401).json("Error: " + err));
      }
      catch(err) {
        return next(new HttpError(err.message, 401));
      }
};

const getAllStudentsInSection = async(req ,res , next) => {
    const class_query = {sectionName : req.body.sectionName}
    console.log(class_query)
    console.log("Result check")
    const temp_class = await Class.findOne(class_query).populate('sectionList');
    if(temp_class === null)
    {
        res.status(401)
        return;
    }
    console.log(temp_class)
    temp_class.sectionList = temp_class.sectionList || [];
    for(let i=0;i<temp_class.sectionList.length; i++)
        {
            if(temp_class.sectionList[i].sectionName === req.body.sectionName)
                {
                    console.log("found")
                    const temp_section = await Section.findById(temp_class.sectionList[i]._id).populate('studentIdList')
                     res.status(201).json(temp_section.studentIdList);
                    return
                }

        }
    res.status(401);
    return

};


const removeStudentFromSection = async(req,res,next) => {
    const student_query = {rollNumber : req.body.rollNumber};
    const class_query = {classYear : req.body.classYear};
    const section_query = {sectionName : req.body.sectionName};

    const tempStudent = await Student.findOne(student_query);
    // console.log(tempStudent)
 
     const tempOldClass = await Class.findOne(class_query).populate('sectionList');
     for(let i=0;i<tempOldClass.sectionList.length;i++)
     {
         if(tempOldClass.sectionList[i].sectionName === req.body.sectionName)
         {
            // console.log(tempOldClass.sectionList[i].sectionName)
             const tempOldSection = await Section.findOne(section_query).populate('studentIdList');
             for(let j=0;j<tempOldSection.studentIdList.length;j++)
             {
                 if(tempOldSection.studentIdList[j].rollNumber === tempStudent.rollNumber)
                 {
                    console.log(j)
                     tempOldSection.studentIdList.splice(j,1);
                     console.log("popped from")
                     console.log(tempOldSection.studentIdList)
                     tempOldSection.strength = tempOldSection.strength - 1;
                      tempOldSection
                     .save()
                     .then(res.status(201));
                     return;
                 }
             }
         }
     }
     return;
}


exports.removeStudentFromSection = removeStudentFromSection
exports.changeStudentSection = changeStudentSection;
exports.getAllStudentsInSection = getAllStudentsInSection;
exports.getSectionById = getSectionById;
exports.addStudentToSection = addStudentToSection;
exports.getAllSections = getAllSections;
