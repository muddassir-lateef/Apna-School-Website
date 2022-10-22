const express = require('express');
const router = express.Router();

const ExamController = require('../controllers/exam-controller');
const Exam = require('../models/exam.model');

router.post('/addNew', ExamController.createExam);
/*
{
    subject = 'OOP',
    date = Date,
    totalMarks = 100,
    venue = 'GPU Lab'
}
*/

router.patch('/:examId', ExamController.updateExam);
/*
{
    subject = '',
    date = Date,
    totalMarks = 100,
    venue = 'GPU Lab'
}
*/
router.delete('/:examId', ExamController.dropExam);


router.patch('/addMarks/:examId', ExamController.addMarks);
//exam id in the url
/* 
    {
        "obtainedMarks": 46,
        "studentId": "6302b97d0854df3a3e8ad8ec"
    }
*/


router.patch('/updateMarks/:examId', ExamController.updateMarks);
/* 
    {
        "obtainedMarks": 46,
        "studentId": "6302b97d0854df3a3e8ad8ec"
    }
*/

router.get('/:examId', ExamController.getExamById)

router.get('/', ExamController.getAllExams);


module.exports = router;