let Login = require('../models/login.model');
let Admin = require('../models/admin.model');


const HttpError = require('../models/http-error');


const getAllAdmin = async (req, res, next) => {
    try {
        Admin.find()
        .then((admins) => res.status(201).json(admins))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const updateAdmin = async (req, res, next) => {
    try {
        const username ={username:req.params.username};
        const updates=req.body;
        Admin.findOneAndUpdate(username,updates)
        .then(() => res.json("Update operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const deleteAdmin = async (req, res, next) => {
    try {
        const username ={username:req.params.username};

        Admin.findOneAndDelete(username)
        .then(() => res.json("Delete operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const getAdminByUsername = async (req, res, next) => {
    try {
      const username=req.params.username;
      Admin.findOne({username:username})
        .then((login) => res.status(201).json(login))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };
exports.getAllAdmin = getAllAdmin;
exports.updateAdmin = updateAdmin;
exports.deleteAdmin = deleteAdmin;
exports.getAdminByUsername = getAdminByUsername;