const express = require('express');
const router = express.Router();

const studentAttendanceController = require('../controllers/studentAttendance-controller');




router.post('/addNew', studentAttendanceController.addStudentAttendance)
router.post('/genClassAttendance', studentAttendanceController.genClassAttendance)
router.patch('/getAttendanceRegisteries', studentAttendanceController.getAttendanceRegisteries)
router.patch('/getAttendanceEnteries', studentAttendanceController.getAttendanceEnteries)
router.patch('/setAttendanceEnteries', studentAttendanceController.setAttendanceEnteries)

module.exports = router;