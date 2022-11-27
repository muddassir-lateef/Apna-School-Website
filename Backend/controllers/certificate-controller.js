const moment = require("moment");
const PDFDocument = require("pdfkit");
const path = require("path");
const { dirname } = require("path");
let Student = require('../models/student.model');
let FeeList = require('../models/feeDetails.model')
let { cloudinary } = require("../utils/cloudinary");
const axios = require("axios")

const PDFDoc = require("pdfkit-table");
const FeeRecord = require("../models/feeRecord.model");
const IMG_URL = "http://res.cloudinary.com/dqxdmayga/image/upload/r_max/v1/";   //base url for student images 
const NAPHS_LOGO_URL = "https://res.cloudinary.com/dqxdmayga/image/upload/v1669017689/ApnaSchoolAssets/276025027_3169127859989568_1243177423614720716_n_lekvgp.jpg";

  async function fetchImage(src) {
    const image = await axios
        .get(src, {
            responseType: 'arraybuffer'
        })
    return image.data;
}
const genCert = async (req, res, next) => {

    const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
    });
    res.setHeader('Content-type', 'application/pdf');



    // The name
    const name = req.params.name
    const absPath = path.join(__dirname, "../certificateTemplates/cert2/images/certificate.png"); // <-- absolute path
    console.log("Dir:",__dirname)
    console.log("Path:",absPath)

    doc.image(absPath, 0, 0, { width: 842 });
    const absPath1 = path.join(__dirname, "../certificateTemplates/cert2/fonts/DancingScript-VariableFont_wght.ttf"); // <-- absolute path
    doc.font(absPath1);
    doc.fontSize(60).text(name, 60, 290, {
        align: "center"
    });
    doc.fontSize(17).text(moment().format("MMMM Do YYYY"), 375, 480, {
        align: "center"
    });
    doc.pipe(res);
    doc.end();
};


const genResult = async (req, res, next) => {
    let doc = new PDFDoc({ margin: 30, size: 'A4' });
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#c2cfff');
    const img1 = await fetchImage(NAPHS_LOGO_URL);
    doc.image(img1, 220, 10, {fit: [150, 120], align: 'center'})
    doc.moveDown();
    //adding logo at the top 
    res.setHeader('Content-type', 'application/pdf');
   // console.log("ROW DATA: ", req.body)
    const rollNumber = req.params.rollNumber
    const tempStudent = await Student.find({rollNumber})
   /* if (tempStudent !== null){
        console.log("Student: ", tempStudent)
        try{
            const imgURL = IMG_URL + tempStudent[0].image;
            //console.log("URL: ", imgURL)
            const img = await fetchImage(imgURL);
            doc.image(img, 420, 10, {fit: [100, 100]})
            doc.moveDown();
        }
        catch (error) {
            console.error(error);
        }

    }*/
    
    //console.log("ROLL NUMBER: ", rollNumber)

    var totalMarks = 0;
    var obtainedMarks = 0;
    const rowData = []
    if (Array.isArray(req.body) && req.body.length > 0){
        for (let i=0; i<req.body.length; i++){
            rowData.push([req.body[i].subject, req.body[i].totalMarks, req.body[i].obtainedMarks, req.body[i].percentage])
            totalMarks += parseFloat(req.body[i].totalMarks)
            obtainedMarks += parseFloat((req.body[i].obtainedMarks))
        }
    }

    const tableArray0 = {
        title: "Student Information",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Name", property: 'name', renderer: null }, 
            { label: "Roll Number", property: 'rollNo', renderer: null }, 
            { label: "Class", property: 'class', renderer: null }, 
          ],
        rows: [[tempStudent[0].firstName  + tempStudent[0].lastName, tempStudent[0].rollNumber , tempStudent[0].classYear]],
    };
    doc.table( tableArray0,{ width: 530, x: 25, y: 150, headerColor:'#182747'});
    doc.moveDown(); doc.moveDown();
    
    const tableArray = {
        title: "Term Performance",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Exam", property: 'exam', renderer: null },
            { label: "Total Marks", property: 'totalmarks', renderer: null }, 
            { label: "Obtained Marks", property: 'obtainedmarks', renderer: null }, 
            { label: "percentage", property: 'perventage', renderer: null }, 
          ],
        rows: rowData,
      };
    doc.table( tableArray,{ width: 530, x: 25, headerColor:'#182747'});

    for (let i=0; i<rowData.length-2; i++){
        doc.moveDown();
    }

    const tableArray2 = {
        title: "Overall Performance",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Total Marks", property: 'totalmarks', renderer: null }, 
            { label: "Obtained Marks", property: 'obtainedmarks', renderer: null }, 
            { label: "Percentage", property: 'percentage', renderer: null }, 
          ],
        rows: [[totalMarks, obtainedMarks, ((obtainedMarks/totalMarks) * 100).toFixed(2)]],
    };
    doc.table( tableArray2,{ width: 530, x: 25, headerColor:'#182747'});

 
    doc.pipe(res);
    doc.end();
};

const genFeeChallan = async (req, res, next) => {
    let doc = new PDFDoc({ margin: 30, size: 'A4' });
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#c2cfff');
    const img1 = await fetchImage(NAPHS_LOGO_URL);
    doc.image(img1, 220, 10, {fit: [150, 120], align: 'center'})
    doc.moveDown();
    doc.text("School Copy", 220, 10, {fit : [150,120], align : 'center'})
    //adding logo at the top 
    res.setHeader('Content-type', 'application/pdf');
   // console.log("ROW DATA: ", req.body)
   const student_query = { rollNumber: req.params.rollNumber };
   const tempStudent = await Student.findOne(student_query).populate('sectionId', 'feeRecord');
   const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');

   if(tempFeeRecord.feeList.length > 0)
   {
    //
    //
    //
    let tempFee = tempFeeRecord.feeList[0]

    for(let i=0;i< tempFeeRecord.feeList.length ; i++)
    {
      if(tempFeeRecord.feeList[i].createdAt > tempFee.createdAt )
      {
        tempFee = tempFeeRecord.feeList[i]
 
      }
      
    }

    //
    var d = new Date(tempFee.date);
    //INVALID CHECK
 
    var date = d.getDate();
    var month = d.getMonth() + 1; 
    var year = d.getFullYear();
    var newDate = date + "/" + month + "/" + year;
    //


    //
    //
    //
    const tableArray0 = {
        title: "Student Information",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Name", property: 'name', renderer: null }, 
            { label: "Roll Number", property: 'rollNo', renderer: null }, 
            { label: "Class", property: 'class', renderer: null }, 
            { label: "Fee ID", propaert: 'feeID', renderer: null}
            
          ],
        rows: [[tempStudent.firstName  +" " + tempStudent.lastName, tempStudent.rollNumber , tempStudent.classYear + tempStudent.sectionName, tempFee._id]],
    };
    doc.table( tableArray0,{ width: 530, x: 25, y: 150, headerColor:'#182747'});
    doc.moveDown(); doc.moveDown();
    console.log("fdknfj")
    console.log(tempFee.remainingFee)
    
    const tableArray = {
        title: "Monthly Fee Details",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Tution Fee", property: 'exam', renderer: null },
            { label: "Admission Fee", property: 'totalmarks', renderer: null }, 
            { label: "Exam Fee", property: 'obtainedmarks', renderer: null }, 
            { label: "Sports Fee", property: 'perventage', renderer: null }, 
            { label: "Other Fee(s)", property: 'obtainedmarks', renderer: null }, 
            { label: "Total Fee", property: 'perventage', renderer: null }, 
            { label: "Paid Fee", property: 'obtainedmarks', renderer: null }, 
            { label: "Remaining Fee", property: 'remaFee', renderer: null }, 

          ],
          rows: [[tempFee.tuitionFee, tempFee.admissionFee , tempFee.examFee , tempFee.sportsFee, tempFee.otherFee, tempFee.totalFee, tempFee.paidFee, tempFee.remainingFee]],
      };
    doc.table( tableArray,{ width: 530, x: 25, headerColor:'#182747'});
    const gt = tempFeeRecord.outStandingFees - tempFee.remainingFee
    const tableArray2 = {
        title: "Extensive Fee Details",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Previous Dues", property: 'previousdues', renderer: null }, 
            { label: "Grand Total", property: 'obtainedmarks', renderer: null }, 
            { label: "Due Date", property: 'percentage', renderer: null }, 
          ],
        rows: [[gt, tempFeeRecord.outStandingFees, newDate]],
    };
    doc.table( tableArray2,{ width: 530, x: 25, headerColor:'#182747'});

    //
    const tableArray4 = {
        title: "Student Information",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Name", property: 'name', renderer: null }, 
            { label: "Roll Number", property: 'rollNo', renderer: null }, 
            { label: "Class", property: 'class', renderer: null }, 
            { label: "Fee ID", propaert: 'feeID', renderer: null}
            
          ],
        rows: [[tempStudent.firstName  +" " + tempStudent.lastName, tempStudent.rollNumber , tempStudent.classYear + tempStudent.sectionName, tempFee._id]],
    };
    doc.table( tableArray0,{ width: 530, x: 25, y: 150, headerColor:'#182747'});
    doc.moveDown(); doc.moveDown();
    console.log("fdknfj")
    console.log(tempFee.remainingFee)
    
    const tableArray5 = {
        title: "Monthly Fee Details",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Tution Fee", property: 'exam', renderer: null },
            { label: "Admission Fee", property: 'totalmarks', renderer: null }, 
            { label: "Exam Fee", property: 'obtainedmarks', renderer: null }, 
            { label: "Sports Fee", property: 'perventage', renderer: null }, 
            { label: "Other Fee(s)", property: 'obtainedmarks', renderer: null }, 
            { label: "Total Fee", property: 'perventage', renderer: null }, 
            { label: "Paid Fee", property: 'obtainedmarks', renderer: null }, 
            { label: "Remaining Fee", property: 'remaFee', renderer: null }, 

          ],
          rows: [[tempFee.tuitionFee, tempFee.admissionFee , tempFee.examFee , tempFee.sportsFee, tempFee.otherFee, tempFee.totalFee, tempFee.paidFee, tempFee.remainingFee]],
      };
    doc.table( tableArray,{ width: 530, x: 25, headerColor:'#182747'});
    const tableArray7 = {
        title: "Extensive Fee Details",
        //headers: ["Exam", "Total Marks", "Obtained Marks", "Percentage"],
        headers: [
            { label: "Previous Dues", property: 'previousdues', renderer: null }, 
            { label: "Grand Total", property: 'obtainedmarks', renderer: null }, 
            { label: "Due Date", property: 'percentage', renderer: null }, 
          ],
        rows: [[gt, tempFeeRecord.outStandingFees, newDate]],
    };
    doc.table( tableArray2,{ width: 530, x: 25, headerColor:'#182747'});
 
    doc.pipe(res);
    doc.end();
}
};

exports.genFeeChallan = genFeeChallan
exports.genCert = genCert;
exports.genResult = genResult;