const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
let User = require('../models/user.model');
const HttpError = require('../models/http-error');


const usersController = require('../controllers/users-controller');

//add user
router.post(
  "/newUser",
  [
    check("username").not().isEmpty(),
    check("type").not().isEmpty(),
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty()
  ],
  usersController.addNewUser
);

//get all users 
router.get('/', usersController.getUsers);

//get a user 
router.get('/:userId', getUser, usersController.getUserById);

//update user 
router.patch('/:userId', getUser, usersController.updateUser);

//delete a user 
router.delete('/:userId', getUser, usersController.deleteUser);

async function getUser(req, res, next) {
  let user;
  try {
    console.log (req.params.userId)
    user = await User.findById(req.params.userId);
    if (user == null) {
      return next(new HttpError("Cannot find user", 404));
    }
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
  res.user = user;
  next();

}

module.exports = router;
