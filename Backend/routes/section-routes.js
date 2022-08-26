const express = require('express');
const router = express.Router();

const SectionController = require('../controllers/section-controller');



router.patch('/addStudentToSection', SectionController.addStudentToSection);
/*
  "sectionName" : "A",
  "rollNumber" : 6000
*/


router.get('/getSectionById',SectionController.getSectionById);
/*
  STUDENTS ROLL NUMBER
  "rollNumber" : 6000
*/
router.get('/', SectionController.getAllSections);

router.get('/getAllStudentsInSection', SectionController.getAllStudentsInSection);
/*
  "className" : "A"
  "classYear" : 7 (HAS TO BE IMPLEMENTED)
*/
module.exports = router;