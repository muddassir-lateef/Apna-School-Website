const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const AdminModel = require('./models/Admin');
const usersRoutes = require('./routes/users-routes');
const HttpError = require("./models/http-error");
mongoose.connect("mongodb+srv://Shayan:ApnaSchool@apnaschool.y3ountm.mongodb.net/Apna-School-DB?retryWrites=true&w=majority");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use('/api/users', usersRoutes);

const { Students, Class } = require('./models/schemas');


//GET && POST FOR STUDENT
app.get("/getStudents", (req,res) => {
    Students.find({}, (err,result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });
});

app.post("/addStudent", async (req,res) => {
    const object = req.body;
    const newObject = new Students(object);
    await newObject.save();
    res.json(object);
})
//------------//
app.get("/getClass", (req,res) => {
    Class.find({}, (err,result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });
});

app.post("/addClass", async (req,res) => {
    const object = req.body;
    const newObject = new Class(object);
    await newObject.save();

    res.json(object);
})



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

app.listen(3001, () => {
    console.log("Zuberi is beauitful very much")
})