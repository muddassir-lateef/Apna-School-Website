const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const HttpError = require('./models/http-error');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//const exercisesRouter = require('./routes/exercises');

const loginRouter = require('./routes/login-routes');
const calendarRouter = require('./routes/calendar-routes');
const studentRouter = require('./routes/student-routes')
const adminRouter = require('./routes/admin-routes')
const examRouter = require('./routes/exam-routes');
const marksRouter = require('./routes/marks-routes');
const lectureRouter = require('./routes/lecture-routes');

//app.use('/exercises', exercisesRouter);
app.use('/admin',adminRouter);
app.use('/login', loginRouter);
app.use('/calendar', calendarRouter);
app.use('/student',studentRouter);
app.use('/exam', examRouter);
app.use('/marks', marksRouter);
app.use('/lecture', lectureRouter);
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