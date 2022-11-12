const HttpError = require ('../models/http-error');
const Exam = require('../models/exam.model');
const Marks = require('../models/marks.model');
const Class = require('../models/class.model')


const createExam = async(req, res, next) => {
    const date = new Date(req.body.date);
    const subject = req.body.subject || "";
    const totalMarks = req.body.totalMarks || 0;
    const venue = req.body.venue || "";

    ///var temp_class = await Class.findOne({_id : req.body.classId});
    //if (temp_class === null) temp_class = {_id: ""};
    const classId = req.body.classId.trim() || "";

    const exam = new Exam ({date, subject, totalMarks, venue, classId});
    exam
      .save()
      .then(() => res.status(201).json({ message: "Exam added!", Exam: exam }))
      .catch((err) => res.status(400).json("Error: " + err));
    
}


const getAllExams = async (req, res, next) => {
  if (await Exam.exists()) {
    Exam.find()
      .populate("teacherId")
      .populate("classId")
      .populate("marks")
      .then((exams) => res.status(201).json(exams))
      .catch((err) => res.status(400).json("Error: " + err));
  }
  else{
    return next(new HttpError("No exams found", 404));
  }
};

//update exam title, venue etc
const updateExam = async (req, res, next) => {
  const id = req.params.examId;
  if (id == null) {
    return next(new HttpError("No exams found", 404));
  }
  const updates = req.body;
  Exam.findOneAndUpdate(id, updates).then(() =>
    res.json("Exam updated successfully!")
  );
};

// add marks for a student for an exam
const addMarks = async(req, res, next) => {
    const examId = req.params.examId;

    var marksList = req.body.marksList || []
    console.log("MARKS LIST: ", marksList)
    console.log(typeof marksList)
   // res.status(201).json({message: "Marks Received"})
    const exam = await Exam.findById(examId);
    if (exam === null){
      return next(new HttpError("No exams found", 404));
    }

    if (Array.isArray(marksList) && marksList.length > 0)
    for (var i=0; i<marksList.length; i++){
      var flag = false;

      const obtainedMarks = marksList[i].obtainedMarks;
      const studentId = marksList[i].studentId;
    
      //before entering marks, we need to check if marks for that student are already present
      for (let i=0; i<exam.marks.length; i++){
          temp_mark = await Marks.findById(exam.marks[i]);
          if (temp_mark && temp_mark.studentId == studentId){
              flag = true;
              temp_mark.obtainedMarks = obtainedMarks;
              await temp_mark.save();
          }
      }
      if (flag === false){
        const mark = new Marks({obtainedMarks, studentId, examId});
        await mark.save();
        exam.marks.push(mark._id);
      }
      
    }
    exam
      .save()
      .then(() => res.status(201).json({ message: "Marks added to exam!", Exam: exam }))
      .catch((err) => res.status(400).json("Error: " + err));
    /*const exam = await Exam.findById(examId);
    if (exam == null){
        return next(new HttpError("No exams found", 404));
    }
    //before entering marks, we need to check if marks for that student are already present
    for (let i=0; i<exam.marks.length; i++){
        temp_mark = await Marks.findById(exam.marks[i]);
        if (temp_mark && temp_mark.studentId == studentId){
            return next(new HttpError("Marks already present for the student", 409));
        }
    }

    const mark = new Marks({obtainedMarks, studentId});
    await mark.save();
    exam.marks.push(mark._id);
    exam
      .save()
      .then(() => res.json({ message: "Marks added to exam!", Exam: exam }))
      .catch((err) => res.status(400).json("Error: " + err));*/
}

//update marks for a student in an exam
const updateMarks = async(req, res, next) => {
    const examId = req.params.examId;
    const studentId = req.body.studentId;
    const obtainedMarks = req.body.obtainedMarks;

    const exam = await Exam.findById(examId);
    if (exam == null){
        return next(new HttpError("No exams found", 404));
    }
    
    for (let i=0; i<exam.marks.length; i++){
        temp_mark = await Marks.findById(exam.marks[i]);
        if (temp_mark.studentId == studentId){
            temp_mark.obtainedMarks = obtainedMarks;
            temp_mark
                .save()
                .then(() => res.status(200).json({ message: "Marks updated successfully!", Marks:temp_mark }))
                .catch((err) => res.status(400).json("Error: " + err));
            return;
        }
    }
    //if marks were not updated
    res.status(400).json({message: "Marks were not updated!"});
    
}

const dropExam = async(req, res, next) => {
  const examId = req.params.examId;
  const exam = await Exam.findById(examId);
  if (exam !== null && Array.isArray(exam.marks))
  for (let i=0; i<exam.marks.length; i++){
    await Marks.findByIdAndRemove(exam.marks[i]);
  }
  Exam.findByIdAndRemove(examId)
  .then(() =>
    res.status(202).json("Exam Deleted successfuly!")
  )
  .catch((err) => res.status(400).json("Error: " + err));
}

const getExamById = async(req, res, next) => {
  try {
    const examId = req.params.examId;
    Exam.findOne({ _id: examId }).populate('classId').populate('marks').populate('teacherId')
      .then((exams) => res.status(201).json(exams))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

const getMarks = async(req, res, next) => {
  const examId = req.params.examId;
  const exam = await Exam.findById(examId);
  if (exam === null){
    return res.status(404).json({message: "Marks were not found!"});
  }

  if (Array.isArray(exam.marks) && exam.marks.length > 0){
    const marksList = []
    for (let i=0; i<exam.marks.length; i++){
      const mark = await Marks.findById(exam.marks[i]).populate('studentId');
      marksList.push(mark)
    }

    return res.status(200).json(marksList)
  }

  return res.status(404).json({message: "Marks were not found!"});
  
}

exports.dropExam = dropExam;
exports.createExam = createExam;
exports.getAllExams = getAllExams;
exports.updateExam = updateExam;
exports.addMarks = addMarks;
exports.updateMarks = updateMarks;
exports.getExamById = getExamById;
exports.getMarks = getMarks;