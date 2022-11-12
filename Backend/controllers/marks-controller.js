const HttpError = require ('../models/http-error');
const Marks = require('../models/marks.model');

const getAllMarks = async(req, res, next) => {
    try {
        Marks.find()
          .populate("studentId")
          .populate("examId")
          .then((marks) => res.status(201).json(marks))
          .catch((err) => res.status(400).json("Error: " + err));
      } catch (err) {
        return next(new HttpError(err.message, 500));
      }
}

const getMarksById = async(req, res, next) => {
    id = req.params.marksId;
    try {
        Marks.findById(id)
          .populate("studentId")
          .then((marks) => res.status(201).json(marks))
          .catch((err) => res.status(400).json("Error: " + err));
      } catch (err) {
        return next(new HttpError(err.message, 500));
      }
}

exports.getAllMarks = getAllMarks;
exports.getMarksById = getMarksById;