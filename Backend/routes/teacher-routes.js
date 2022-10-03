const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacher-controller');



//get a teacher by username
router.get('/:username', teacherController.getTeacherByUsername)

router.post('/addNew', teacherController.addTeacher)
//get a list of all teachers
router.get('/', teacherController.getAllTeacher)

router.patch('/unassign/:username', teacherController.unAssignSection)


//update a teacher by username
router.patch('/:username', teacherController.updateTeacher)
/*
required JSON format:
{
  "firstName":"newuser",
  "lastName":"newuserlastname",
  "age":"18"
  
}
*/

//delete a teacher by username
router.delete('/:username', teacherController.deleteTeacher)

module.exports = router;
