const express = require('express');
const router = express.Router();

const SectionController = require('../controllers/section-controller');



router.patch('/addStudentToSection', SectionController.addStudentToSection);
/*
  "classYear" : 7
  "sectionName" : "A",
  "rollNumber" : 1
*/

router.patch('/changeStudentSection', SectionController.changeStudentSection)
/*
{
  "oldClass" : 7,
  "newClass" : 7,
  "oldSection" : "A",
  "newSection" : "B",
  "rollNumber" : 5
}

*/


router.patch('/removeStudentFromSection', SectionController.removeStudentFromSection)
/*
{
"classYear" : 7,
"sectionName" : "A",
"rollNumber" : 5
}

*/
router.get('/getSectionById',SectionController.getSectionById);
/*
  STUDENTS ROLL NUMBER
  "rollNumber" : 6000
*/
router.get('/', SectionController.getAllSections);

router.patch('/getAllStudentsInSection', SectionController.getAllStudentsInSection);
/*
  "className" : "A"
  "classYear" : 7 
*/
module.exports = router;