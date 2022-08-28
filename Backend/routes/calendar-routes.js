const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendar-controller');


//add a new calendar for the year 
router.post('/addNew', calendarController.addCalendar)
/*
{
    year: 2022,
    exams: [{}],
    events: [{}]
}
*/

//get all calendars
router.get('/:year', calendarController.getCalendarByYear);
//e.g: get /calendar/2022


//delete a calendar for a year 
router.delete('/:year', calendarController.deleteCalendar);
//e.g: delete /calendar/2022

//update a calendar 
router.patch('/:year', calendarController.updateCalendar);
// patch /calendar/:year
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

//get all calendars
router.get('/', calendarController.getAllCalendars);
// get /calendar/




module.exports = router;
