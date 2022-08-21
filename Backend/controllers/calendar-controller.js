let Calendar = require('../models/calendar.model');
const HttpError = require('../models/http-error');

const addCalendar = async(req, res, next) => {
    try{
        const year = req.body.year? req.body.year: 0;
        const events = req.body.events? req.body.events: [];
        const exams = req.body.exams? req.body.exams: [];

        const newCalendar = new Calendar({year, events, exams});
        newCalendar
        .save()
        .then(() => res.json({ message: "Calendar added!", calendar: newCalendar }))
        .catch((err) => res.status(400).json("Error: " + err));

    }catch(err){
        return next( new HttpError(err.message, 500));
    }

}

const getAllCalendars = async (req, res, next) => {
  try {
    Calendar.find()
      .populate("exams")
      .then((calendars) => res.status(201).json(calendars))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const getCalendarByYear = async (req, res, next) => {
  try {
    const year = req.params.year;
    const calendar = await Calendar.find({'year': year});
    if (calendar.length == 0){
        return next(new HttpError("Cannot find calendar", 404));
    }
    else{
        res.status(201).json({message: "Calendar found", Calendar: calendar});
    }
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};


exports.addCalendar = addCalendar;
exports.getAllCalendars = getAllCalendars;
exports.getCalendarByYear = getCalendarByYear;
