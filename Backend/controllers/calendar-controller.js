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

exports.addCalendar = addCalendar;
