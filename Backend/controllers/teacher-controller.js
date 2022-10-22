let Login = require("../models/login.model");
let Teacher = require("../models/teacher.model");
let { cloudinary } = require("../utils/cloudinary");
let Section = require('../models/section.model')

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
    const username = req.params.username;
    var temp_teacher = await Teacher.findOne({ username });

    const image = req.body.image || "";
    var uploadResponse;
    if (image !== "") {
      uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "Teachers",
      });
      console.log(uploadResponse);
      //delete last image
      console.log("Teacher: " + temp_teacher);
      const public_id = temp_teacher.image;
      console.log("Public ID: " + public_id);
      const deleteResponse = await cloudinary.uploader
        .destroy(public_id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      uploadResponse = { public_id: "" };
    }

    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      age: req.body.age
    };

    if (image !== "" && uploadResponse.public_id !== "") {
      updates.image = uploadResponse.public_id;
    }

    Teacher.findOneAndUpdate({username}, updates)
      .then(() => res.status(201).json("Update operation called successfuly!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const username = req.params.username;
    var temp_teacher = await Teacher.findOne({ username });
    console.log("Teacher: " + temp_teacher);
    const public_id = temp_teacher.image;
    console.log("Public ID: " + public_id);
    const deleteResponse = await cloudinary.uploader
      .destroy(public_id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    if (temp_teacher !== null) {
      Teacher.findByIdAndRemove(temp_teacher._id)
        .then(() =>
          res.status(202).json("Delete operation called successfuly!")
        )
        .catch((err) => res.status(400).json("Error: " + err));
    } else
      return res.status(404).json({ message: "Teacher was not founddeleted" });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const getTeacherByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    Teacher.findOne({ username: username }).populate()
      .then((teachers) => res.status(201).json(teachers))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};


const addTeacher = async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const age = req.body.age;
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

const unAssignSection = async(req, res, next) => {
  const classYear = req.body.classYear;
  const section = req.body.section;
  const username = req.params.username; 

  const temp_teacher = await Teacher.findOne({ username: username });
  if (temp_teacher!==null && Array.isArray(temp_teacher.sections) && temp_teacher.sections.length > 0){
    console.log("Here 1")
    for (let i=0; i< temp_teacher.sections.length; i++){
      console.log("Here 2")
      const temp_sec = await Section.findById(temp_teacher.sections[i])
      console.log(temp_sec)
      if (temp_sec !== null && temp_sec.classYear == classYear && temp_sec.sectionName == section){
        console.log("Here 3")
        const filtered_sections = temp_teacher.sections.filter(item => item != temp_teacher.sections[i])
        temp_teacher.sections = filtered_sections;
        console.log("Filtered: ", filtered_sections)
        console.log("C1: ", String(temp_sec.sectionHead))
        console.log("C2: ", String(temp_teacher._id))
        if (String(temp_sec.sectionHead) == String(temp_teacher._id)){
          console.log("Here 4")
          temp_sec.sectionHead = null
          var result = await temp_sec.save();
          result = await temp_teacher.save();
          return res.status(201).json({message:"Section un assigned successfully, and sectionHead removed", Teacher: temp_teacher})
        }
        result = await temp_teacher.save();
        return res.status(201).json({message:"Section un assigned successfully", Teacher: temp_teacher})
      }
    }
    return res.status(400).json({message:"Section was not un assigned"})
  }
  res.status(401).json({message:"Teacher does not have any assigned sections"})
}

exports.getAllTeacher = getAllTeacher;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;
exports.getTeacherByUsername = getTeacherByUsername;
exports.addTeacher = addTeacher;
exports.unAssignSection = unAssignSection;
