const HttpError = require('../models/http-error');
let Student = require('../models/student.model');
let FeeRecord = require('../models/feeRecord.model');
let FeeDetail = require('../models/feeDetails.model');



const addFeeDetailToStudentFeeRecord = async(req,res,next) => {
    //Creating new FeeDetail object by Body
    const feeYear = req.body.feeYear;
    const feeMonth = req.body.feeMonth;
    let totalFee = req.body.totalFee? req.body.totalFee : 0;
    const tuitionFee = req.body.tuitionFee;
    const fineFee = req.body.fineFee;
    const securityFee = req.body.securityFee;
    const paidFee = req.body.paidFee;
    totalFee = tuitionFee + fineFee + securityFee - paidFee;
    let remainingFee = totalFee;
    const newFeeDetails= new FeeDetail({

        feeYear, feeMonth,totalFee,tuitionFee,fineFee,securityFee,paidFee,remainingFee

                                 });
    newFeeDetails.save();

    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');
    
    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.save()
      .then(() => res.json({ message: "FeeRecord has been updated with new Fee", FeeRecord: tempFeeRecord }))
      .catch((err) => res.status(400).json("Error: " + err));

  }

 

const getAllFeeDetailsFromStudentFeeRecord = async(req,res,next) => {
    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');

    res.status(201).json(tempFeeRecord.feeList);
    return;

}

const payFee = async(req,res,next) => {

    const feeMonth = req.body.feeMonth;
    const feeYear = req.body.feeYear;
    const paidAmount = req.body.paidAmount;
    console.log("Hit")
    //Finding the student with the rollNumber passed in the request body
    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');
    console.log("Student FOund")
    //Finding the FeeRecord in the student by the student found
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');
    console.log("fee Record Found")
    //Looping through the feeRecord to find the desired Fee
    for(let i=0; i<tempFeeRecord.feeList.length; i++)
    {
        console.log("Fee FOund")
        if(tempFeeRecord.feeList[i].feeYear === feeYear)
        {
            if(tempFeeRecord.feeList[i].feeMonth == feeMonth)
            {
            console.log("Hello")
            tempFeeRecord.feeList[i].remainingFee = tempFeeRecord.feeList[i].remainingFee - paidAmount;
            tempFeeRecord.feeList[i].paidFee = tempFeeRecord.feeList[i].paidFee + paidAmount;
            tempFeeRecord.feeList[i].save();
            tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees - paidAmount;
            tempFeeRecord.save();
            res.status(201).json(tempFeeRecord.feeList[i]);
            return
            }
        }
    }
    res.status(401);
    return;
}
const markFeePaid = async(req,res,next) => {
    const feeMonth = req.body.feeMonth;
    const feeYear = req.body.feeYear;
    console.log("Hit")
    //Finding the student with the rollNumber passed in the request body
    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');
    console.log("Student FOund")
    //Finding the FeeRecord in the student by the student found
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');
    console.log("fee Record Found")
    //Looping through the feeRecord to find the desired Fee
    for(let i=0; i<tempFeeRecord.feeList.length; i++)
    {
        console.log("Fee FOund")
        if(tempFeeRecord.feeList[i].feeYear === feeYear)
        {
            if(tempFeeRecord.feeList[i].feeMonth == feeMonth)
            {
            console.log("Hello")
            tempFeeRecord.feeList[i].remainingFee = 0
            tempFeeRecord.feeList[i].paidFee = tempFeeRecord.feeList[i].totalFee
            tempFeeRecord.feeList[i].save();
            tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees - tempFeeRecord.feeList[i].totalFee;
            tempFeeRecord.save();
            res.status(201).json(tempFeeRecord.feeList[i]);
            return
            }
        }
    }
    res.status(401);
    return;
}

const getStudentFeeRecord= async(req,res,next) => {
    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');

    res.status(201).json(tempFeeRecord);
    return;

}

const generateStudentFee = async(req,res,next) => {

    const feeYear = req.body.feeYear;
    const feeMonth = req.body.feeMonth;

    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');

    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');

    let totalFee = tempFeeRecord.totalFee - tempFeeRecord.scholarshipAmount;
    const tuitionFee = tempFeeRecord.tuitionFee;
    const fineFee = 0;
    const securityFee = tempFeeRecord.securityFee;
    const paidFee = 0;
    const remainingFee = totalFee;


    const newFeeDetails= new FeeDetail({

        feeYear, feeMonth, totalFee, tuitionFee, fineFee, securityFee, paidFee, remainingFee
                                 });
    newFeeDetails.save();

    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
    tempFeeRecord.save();
    res.status(201).json(newFeeDetails)
    return;

}

const updateStudentFeeRecord = async(req,res,next) => {

    const securityFee = req.body.securityFee;
    const tuitionFee = req.body.tuitionFee;
    const scholarshipAmount = req.body.scholarshipAmount;


    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');

    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList')

    tempFeeRecord.securityFee = securityFee;
    tempFeeRecord.tuitionFee = tuitionFee;
    tempFeeRecord.scholarshipAmount = scholarshipAmount;
    tempFeeRecord.totalFee = securityFee + tuitionFee;
    tempFeeRecord.save()
    .then(() => res.status(201).json({ message: "Fee Record Updates" }))
      .catch((err) => res.status(401).json("Error: " + err));
    return;
    

}
  exports.getStudentFeeRecord = getStudentFeeRecord;
  exports.markFeePaid = markFeePaid;
  exports.payFee = payFee;
  exports.getAllFeeDetailsFromStudentFeeRecord = getAllFeeDetailsFromStudentFeeRecord;
  exports.addFeeDetailToStudentFeeRecord = addFeeDetailToStudentFeeRecord;
  exports.generateStudentFee = generateStudentFee;
  exports.updateStudentFeeRecord = updateStudentFeeRecord;