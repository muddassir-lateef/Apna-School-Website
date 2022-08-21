const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendar-controller');


//add a new calendar for the year 
router.post('/addNew', calendarController.addCalendar)
/*
{
    year: 2022,
    exams: {},
    events: {}
}
*/

//get all calendars
router.get('/:year', calendarController.getCalendarByYear);
//e.g: get /calendar/2022


//get all calendars
router.get('/', calendarController.getAllCalendars);
// get /calendar/




module.exports = router;
