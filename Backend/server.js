const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const HttpError = require('./models/http-error');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '50mb'}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
console.log("hello")

//const exercisesRouter = require('./routes/exercises');

const loginRouter = require('./routes/login-routes');
const calendarRouter = require('./routes/calendar-routes');
const studentRouter = require('./routes/student-routes')
const adminRouter = require('./routes/admin-routes')
const sectionRouter = require('./routes/section-routes')
const examRouter = require('./routes/exam-routes');
const marksRouter = require('./routes/marks-routes');
const lectureRouter = require('./routes/lecture-routes');

const staffRouter = require('./routes/staff-routes')
const teacherRouter = require('./routes/teacher-routes')

const feeRecordRouter = require('./routes/feeRecord-routes');
const classRouter = require('./routes/class-routes');
const studentAttendanceRouter = require('./routes/studentAttendance-routes');
const certificateRouter = require('./routes/certificate-routes');

//app.use('/exercises', exercisesRouter);
app.use('/staff',staffRouter);
app.use('/teacher',teacherRouter);
app.use('/admin',adminRouter);
app.use('/login', loginRouter);
app.use('/feeRecord', feeRecordRouter);
app.use('/calendar', calendarRouter);
app.use('/class', classRouter);
app.use('/section', sectionRouter);
app.use('/student',studentRouter);
app.use('/exam', examRouter);
app.use('/marks', marksRouter);
app.use('/lecture', lectureRouter);
app.use('/studentAttendance', studentAttendanceRouter);
app.use('/certificate', certificateRouter);

//only runs if we get some request which did not get a response from upper middlewares
app.use((req, res, next)=>{
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

//error middelware
//special middleware function for error handling
app.use((error, req, res, next)=>{
  if(res.headerSent){
      return next(error);
  }
  //no response has been sent yet 
  res.status(error.code || 500);
  res.json({

      message: error.message || 'An unknown error occured!'
  });
}); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});