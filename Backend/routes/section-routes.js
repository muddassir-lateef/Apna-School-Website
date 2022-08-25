const express = require('express');
const router = express.Router();

const SectionController = require('../controllers/section-controller');

router.post('/addSection',SectionController.addSection);
/*
{
    "sectionName": "A",
    "strength" : 30,
    //These below 3 lines are optinal as not needed while creating
    "lectures": "Salar",
    "studentIdList": "123",
    "sectionHead": "Street 69",
    //

  }
*/
router.patch('/addStudentToSection', SectionController.addStudentToSection);

router.get('/getSectionById',SectionController.getSectionById);
router.get('/', SectionController.getAllSections);

module.exports = router;