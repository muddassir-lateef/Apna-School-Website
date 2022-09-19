const express = require('express');
const router = express.Router();

const classController = require('../controllers/class-controller');

router.post('/addClass', classController.addClass);
/*
    "classYear" : 7,
    "classStrength" : 30
*/
router.post('/addNewSectionToClass', classController.addNewSectionToClass)
/* 
    "sectionName": "A",
    "strength" : 30,
    "lectures": "Salar", ||OPTIONAL
    "studentIdList": "123", ||OPTIONAL
    "sectionHead": "Street 69", ||OPTIONAL
    "classYear" : 7
*/

router.get('/getClass/:classYear' , classController.getClass);
/*

*/
router.get('/getAllClasses', classController.getAllClasses);

router.get('/getAllSectionsInClass', classController.getAllSectionsInClass)

module.exports = router;