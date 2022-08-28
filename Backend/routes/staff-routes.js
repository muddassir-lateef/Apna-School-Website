const express = require('express');
const router = express.Router();

const staffController = require('../controllers/staff-controller');



//get a staff by username
router.get('/:username', staffController.getStaffByUsername)

//get a list of all staff
router.get('/', staffController.getAllStaff)

//update a staff by username
router.patch('/:username', staffController.updateStaff)
/*
required JSON format:
{
  "firstName":"newuser",
  "lastName":"newuserlastname",
  "age":"18"
}
*/

//delete a staff by username
router.delete('/:username', staffController.deleteStaff)

module.exports = router;
