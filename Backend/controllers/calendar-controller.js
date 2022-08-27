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
        .then(() => res.status(201).json({ message: "Calendar added!", calendar: newCalendar }))
        .catch((err) => res.status(400).json("Error: " + err));

    }catch(err){
        return next( new HttpError(err.message, 500));
    }

}

const getAllCalendars = async (req, res, next) => {
  try {
    Calendar.find()
      .populate("exams")
      .then((calendars) => res.status(200).json(calendars))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};

const getCalendarByYear = async (req, res, next) => {
  try {
    const year = req.params.year;
    const calendar = await Calendar.find({'year': year}).populate();
    if (calendar.length == 0){
        return next(new HttpError("Cannot find calendar", 404));
    }
    else{
        res.status(200).json({message: "Calendar found", Calendar: calendar});
    }
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
};



const deleteCalendar = async (req, res, next) => {
  const year = req.params.year;
  //checking if the calendar even exists currently 
  const calendar = await Calendar.find({'year': year});
  if (calendar.length == 0){
    return next(new HttpError("Cannot find calendar", 400));
  }  

  //if the calendar exists, we will delete it 
  Calendar.deleteOne({'year': year}, (err)=>{
    if (err) return next(new HttpError(err.message, 400));  //bad request
  });
  res.status(200).json({message: "Calendar deleted Successfully"});
}

const updateCalendar = async(req, res, next) => {
  const year = req.params.year;
  const examId = req.body.examId? req.body.examId : null;
  const event = req.body.event? req.body.event: null;

  //checking if the calendar already exists
  const calendar = await Calendar.find({'year': year}).populate('exams');
  if (calendar.length == 0){
    return next(new HttpError("Cannot find calendar", 400));
  }  
  if (examId){
    console.log("CALENDAR: " + calendar);
    //calendar.exams = calendar.exams || [];
    calendar.exams.push(examId);
  }

  if (event){
    const tempEvent = {title: event.title, date: event.date, budget: event.budget, wasHoliday: event.wasHoliday};
    //calendar.events = calendar.events || [];
    calendar.events.push(tempEvent);
    calendar
      .save()
      .then(() => res.status(201).json({ message: "Calendar updated!", calendar }))
      .catch((err) => res.status(400).json("Error: " + err));
    return;
  }
  
  res.status(400).json({message: "Bad request, calendar was not updated"});

  /* 
  {
    "examId": id,
    "event": {
      "title": "Some Event",
      "date" : "10/25/2022",
      "budget": 25000,
      "wasHoliday": false
    }
  }
  */
}

exports.addCalendar = addCalendar;
exports.getAllCalendars = getAllCalendars;
exports.getCalendarByYear = getCalendarByYear;
exports.deleteCalendar = deleteCalendar;
exports.updateCalendar = updateCalendar;

