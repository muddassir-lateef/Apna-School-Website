const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/student-controller');


//add a new new Student to the database
router.post('/addStudent', StudentController.addStudent)
/*
{
    "rollNumber": 6000,
    "Age": 12,
    "firstName": "Salar",
    "lastName": "123",
    "guardianFirstName": "Street 69",
    "guardianLastName": "SexyclassLmaodsdsd",
    "cnic" : "1243",
    "emailAddress" : "hotmail",
    "houseAddress" : "Street lmao",
    "phoneNumber" : "0300panji"

    //FeeRecord Attributes
      "securityFee" = : 0,
      "outStandingFees" : 0,
      "totalFee" : 0,
      "tuitionFee" : 0,
      "feeList" : 0,
      "scholarshipAmount" : 0
}

*/
//Update student by roll numbber, have to verify whether if RollNumber is to be passed in URl or Body only
router.patch('/:rollNumber', StudentController.updateStudent)
/*
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
*/

//Get single student by rollNumber passed in the URl
router.get('/:rollNumber' , StudentController.getStudentByRollNumber) 

//get all Students
router.get('/', StudentController.getAllStudents);


router.delete('/deleteStudent/:rollNumber', StudentController.deleteStudent);




module.exports = router;
