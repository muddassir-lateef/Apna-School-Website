const express = require("express");
const app = express();
const mongoose = require('mongoose')
const AdminModel = require('./models/Admin');
mongoose.connect("mongodb+srv://Salar:ApnaSchool@apnaschool.y3ountm.mongodb.net/Apna-School-DB?retryWrites=true&w=majority");
app.use(express.json());
app.use(cors());

app.get("/getAdmins", (req,res) => {
    AdminModel.find({}, (err,result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    });
});

app.post("/addAdmin", async (req,res) => {
    const object = req.body;
    const newObject = new AdminModel(object);
    await newObject.save();

    res.json(object);
})
app.listen(3001, () => {
    console.log("Zuberi is beauitful very")
})