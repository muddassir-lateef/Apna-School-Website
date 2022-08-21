const express = require('express');
const router = express.Router();

const calendarController = require('../controllers/calendar-controller');


//add a new calendar for the year 
router.post('/addCalendar', calendarController.addCalendar)


module.exports = router;
