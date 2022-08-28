let Login = require('../models/login.model');
let Staff = require('../models/staff.model');


const HttpError = require('../models/http-error');


const getAllStaff = async (req, res, next) => {
    try {
        Staff.find()
        .then((staff) => res.status(201).json(staff))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const updateStaff = async (req, res, next) => {
    try {
        const username ={username:req.params.username};
        const updates=req.body;
        Staff.findOneAndUpdate(username,updates)
        .then(() => res.json("Update operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };
 



  const deleteStaff = async (req, res, next) => {
    try {
        const username ={username:req.params.username};

        Staff.findOneAndDelete(username)
        .then(() => res.json("Delete operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const getStaffByUsername = async (req, res, next) => {
    try {
      const username=req.params.username;
      Staff.findOne({username:username})
        .then((Staff) => res.status(201).json(Staff))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };
exports.getAllStaff = getAllStaff;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;
exports.getStaffByUsername = getStaffByUsername;