let Login = require("../models/login.model");
let Teacher = require("../models/teacher.model");
let { cloudinary } = require("../utils/cloudinary");

const HttpError = require("../models/http-error");

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
    const username = { username: req.params.username };
    const updates = req.body;
    Teacher.findOneAndUpdate(username, updates)
      .then(() => res.json("Update operation called successfuly!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const username = req.params.username;
    var temp_teacher = await Teacher.findOne({ username });
    console.log("Teacher: " + temp_teacher)
    const public_id = temp_teacher.image;
    console.log("Public ID: " + public_id)
    const deleteResponse = await cloudinary.uploader
      .destroy(public_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    if (temp_teacher !== null){
    Teacher.findByIdAndRemove(temp_teacher._id)
      .then(() => res.status(202).json("Delete operation called successfuly!"))
      .catch((err) => res.status(400).json("Error: " + err));
    }
    else return res.status(404).json({message: 'Teacher was not found\deleted'})
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const getTeacherByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    Teacher.findOne({ username: username })
      .then((teachers) => res.status(201).json(teachers))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const addTeacher = async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const age = req.body.Age;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const image = req.body.image || "";

    var uploadResponse;
    if (image !== "") {
      uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "Teachers",
      });
      console.log(uploadResponse);
    } else {
      uploadResponse = { public_id: "" };
    }

    const newTeacher = new Teacher({
      firstName,
      lastName,
      age,
      username,
      image: uploadResponse.public_id,
    });

    newTeacher
      .save()
      .then(() => res.status(201).json({ message: "Teacher added!" }))
      .catch((err) => res.status(401).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};
exports.getAllTeacher = getAllTeacher;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;
exports.getTeacherByUsername = getTeacherByUsername;
exports.addTeacher = addTeacher;
