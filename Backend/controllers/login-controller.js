let Login = require('../models/login.model');
let Admin = require('../models/admin.model');
let Teacher = require('../models/teacher.model');
let Staff = require('../models/staff.model');

const HttpError = require('../models/http-error');

const addUser = async(req, res, next) => {
    try{
        const type = req.body.type;
        const username = req.body.username;
        const password = req.body.password; 
        const firstName = req.body.firstName; 
        const lastName = req.body.lastName? req.body.lastName: " ";
        const age = req.body.age? req.body.age: -1;

        if(type=='Admin')
        {
            const newAdmin = new Admin({username,firstName,lastName,age});
            newAdmin.save()
            .then(() => {
              const newLogin =new Login({username,password,type,admin: newAdmin._id});
              newLogin.save()
              .then(() => {
                res.json({ message: "Admin Signup Successful!", admin: newAdmin, login:newLogin });
                })
              .catch(err => res.status(400).json('Error: ' + err));
            
              })
            .catch(err => res.status(400).json('Error: ' + err));
        }
        else if(type=='Staff')
        {
            const newStaff = new Staff({username,firstName,lastName,age});
            newStaff.save()
            .then(() => {
              const newLogin =new Login({username,password,type,staff: newStaff._id});
              newLogin.save()
              .then(() => {
                res.json({ message: "Staff Signup Successful!", staff: newStaff, login:newLogin });
                })
              .catch(err => res.status(400).json('Error: ' + err));
            
              })
            .catch(err => res.status(400).json('Error: ' + err));
        }
        else if(type=='Teacher')
        {
            const newTeacher = new Teacher({username,firstName,lastName,age});
            newTeacher.save()
            .then(() => {
              const newLogin =new Login({username,password,type,teacher: newTeacher._id});
              newLogin.save()
              .then(() => {
                res.json({ message: "Teacher Signup Successful!", teacher: newTeacher, login:newLogin });
                })
              .catch(err => res.status(400).json('Error: ' + err));
            
              })
            .catch(err => res.status(400).json('Error: ' + err));
        }

    }catch(err){
        return next( new HttpError(err.message, 500));
    }

}

const getAllLogin = async (req, res, next) => {
    try {
      Login.find()
        .populate("admin")
        .populate("staff")
        .populate("teacher")
        .then((logins) => res.status(201).json(logins))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };
  const getLoginByUsername = async (req, res, next) => {
    try {
      const username=req.params.username;
      Login.findOne({username:username})
        .populate("admin")
        .populate("staff")
        .populate("teacher")
        .then((login) => res.status(201).json(login))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };
  const verifyLogin = async (req, res, next) => {
    console.log("here")
    try {
      const user=req.body.username;
      const pass=req.body.password;
      console.log(req.body.password)
      const log= await Login.findOne({username:user, password:pass});
      if(log)
      {
        res.status(201).json(log)

      }
      else
      {
        res.status(401).json("Username or Password not found!")
      }
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };
  
  const updateLogin = async (req, res, next) => {
    try {
        const username ={username:req.params.username};
        const updates=req.body;
      Login.findOneAndUpdate(username,updates)
        .then(() => res.json("Update operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

  const deleteLogin = async (req, res, next) => {
    try {
        const username ={username:req.params.username};

      Login.findOneAndDelete(username)
        .then(() => res.json("Delete operation called successfuly!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (err) {
      return next(new HttpError(err.message, 500));
    }
  };

exports.addUser = addUser;
exports.getAllLogin = getAllLogin;
exports.updateLogin = updateLogin;
exports.deleteLogin = deleteLogin;
exports.getLoginByUsername = getLoginByUsername;
exports.verifyLogin = verifyLogin;