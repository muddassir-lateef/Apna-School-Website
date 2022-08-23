const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/student-controller');


//add a new calendar for the year 
router.post('/addStudent', StudentController.addStudent)
/*
{
    "rollNumber": "Salar",
    "Age": 12,
    "firstName": "Salar",
    "lastName": "123",
    "guardianFirstName": "Street 69",
    "guardianLastName": "SexyclassLmaodsdsd",
    "cnic" : "1243",
    "emailAddress" : "hotmail",
    "houseAddress" : "Street lmao",
    "phoneNumber" : "0300panji"
  }
*/

router.patch('/:rollNumber', StudentController.updateStudent)
/*

*/
router.get('/:rollNumber' , StudentController.getStudentByRollNumber)
//get all Students
router.get('/', StudentController.getAllStudents);
// get /Student/




module.exports = router;
