const { validationResult } = require('express-validator');

let User = require('../models/user.model');
const HttpError = require('../models/http-error');


const getUserById = (req, res, next) => {
    res.status(201).json(res.user);
}

const getUsers = async(req, res, next) => {
    User.find()
    .then(users => res.status(201).json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}


const addNewUser = async(req, res, next) => {
  //to make sure the required elements are sent in the body
  const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next( new HttpError('Invalid inputs passed', 422));
    }


  const username = req.body.username;
  const type = req.body.type;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const newUser = new User({ username, type, firstName, lastName });
  newUser
    .save()
    .then(() => res.json({ message: "User added!", student: newUser }))
    .catch((err) => res.status(400).json("Error: " + err));
}

const updateUser = async(req, res, next) => {
    //update user 
    //NOTE: WE ARE NOT ALLOWING A USER TO CHANGE THEIR USERNAME
    if (req.body.type != null){
        res.user.type = req.body.type;
    }
    if (req.body.firstName != null){
        res.user.firstName = req.body.firstName;
    }
    if (req.body.lastName != null){
        res.user.lastName = req.body.lastName;
    }

    try{
        const updatedUser = await res.user.save();
        res.json({message: "User updated successfully", updatedUser });
    }catch(err){
        return next( new HttpError(err.message, 400))
    }
}

const deleteUser = async(req, res, next) => {
    try{
        await res.user.remove();
        res.json({message: "User deleted successfully"})
    }catch(err){
        return next( new HttpError(err.message, 500))
    }

}

exports.getUserById = getUserById;
exports.addNewUser = addNewUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUsers = getUsers;