const express = require("express");
const app = express();
const mongoose = require('mongoose')

const { Students, Class } = require('./models/schemas');


mongoose.connect("mongodb+srv://Salar:ApnaSchool@apnaschool.y3ountm.mongodb.net/Apna-School-DB?retryWrites=true&w=majority");
app.use(express.json());
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


app.listen(3001, () => {
    console.log("Zuberi is beauitful very much")
})