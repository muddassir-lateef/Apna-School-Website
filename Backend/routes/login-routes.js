const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login-controller');

//verify a login by username and password
router.post('/verify', loginController.verifyLogin)
/*
required JSON format:

{
  "username":"user14",
  "password":"pswd",
}
*/

//adds a new user and refers it in a new login
router.post('/add', loginController.addUser)
/*
required JSON format:

{
  "type":"Staff",
  "username":"user14",
  "password":"pswd",
  "firstName":"Muddassir",
  "lastName":"Lateef",
  "age":20
}
*/
//get a login by username
router.get('/:username', loginController.getLoginByUsername)

//get a list of all logins
router.get('/', loginController.getAllLogin)



//update a login by username
router.patch('/:username', loginController.updateLogin)
/*
required JSON format:
{
  "password":"abcdef"
}
*/

//delete a login by username
router.delete('/:username', loginController.deleteLogin)




module.exports = router;
