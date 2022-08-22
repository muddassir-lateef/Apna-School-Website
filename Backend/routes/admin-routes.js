const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');



//get a admin by username
router.get('/:username', adminController.getAdminByUsername)

//get a list of all admins
router.get('/', adminController.getAllAdmin)

//update a admin by username
router.patch('/:username', adminController.updateAdmin)
/*
required JSON format:
{
  "password":"abcdef"
}
*/

//delete a admin by username
router.delete('/:username', adminController.deleteAdmin)

module.exports = router;
