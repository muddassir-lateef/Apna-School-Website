const HttpError = require('../models/http-error');
const Lecture = require('../models/lecture.model');

const getAllLectures = async(req, res, next)=> {
    try {
        Lecture.find()
          .then((lecture) => res.status(201).json(lecture))
          .catch((err) => res.status(400).json("Error: " + err));
      } catch (err) {
        return next(new HttpError(err.message, 500));
      }
      
}

const createNewLecture = async(req, res, next) => {
    const topic = req.body.topic;
    const date = req.body.date;

    lect = new Lecture({topic, date});
    lect 
        .save()
        .then(() => res.json({ message: "Lecture added!", lecture: lect }))
        .catch((err) => res.status(400).json("Error: " + err));
}

exports.getAllLectures = getAllLectures;
exports.createNewLecture = createNewLecture;