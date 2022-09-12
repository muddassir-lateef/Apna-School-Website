let Login = require('../models/login.model');
let Teacher = require('../models/teacher.model');


const HttpError = require('../models/http-error');


const getAllTeacher = async (req, res, next) => {
    try {
        Teacher.find()
        .then((teachers) => res.status(201).json(teachers))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const updateTeacher = async (req, res, next) => {
    try {
        const username ={username:req.params.username};
        const updates=req.body;
        Teacher.findOneAndUpdate(username,updates)
        .then(() => res.json("Update operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const deleteTeacher = async (req, res, next) => {
    try {
        const username ={username:req.params.username};

        Teacher.findOneAndDelete(username)
        .then(() => res.json("Delete operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const getTeacherByUsername = async (req, res, next) => {
    try {
      const username=req.params.username;
      Teacher.findOne({username:username})
        .then((teachers) => res.status(201).json(teachers))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };


  const addTeacher = async(req, res, next) => {
    try{
        const firstName = req.body.firstName;
        const age = req.body.Age;
        const lastName = req.body.lastName;
        const username = req.body.username;

        const newTeacher= new Teacher({

            firstName, lastName, age, username
                                    });


        newTeacher
        .save()
        .then(() => res.status(201).json({ message: "Teacher added!"}))
        .catch((err) => res.status(401).json("Error: " + err));

    }catch(err){
        return next( new HttpError(err.message, 500));
    }

}
exports.getAllTeacher = getAllTeacher;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;
exports.getTeacherByUsername = getTeacherByUsername;
exports.addTeacher = addTeacher;