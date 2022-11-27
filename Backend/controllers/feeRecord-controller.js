const HttpError = require('../models/http-error');
let Student = require('../models/student.model');
let FeeRecord = require('../models/feeRecord.model');
let FeeDetail = require('../models/feeDetails.model');



const addFeeDetailToStudentFeeRecord = async (req, res, next) => {
    const class_query = {classYear : req.body.classYear}
    const section_query = {sectionName : req.body.sectionName}
    console.log(req.body.classYear)
    console.log(req.body.sectionName)
    // All Classes Selected
    if(req.body.classYear === "All")
    {
        const date = req.body.date;
        let tempStudent = await Student.find().populate('sectionId', 'feeRecord');
        //console.log(tempStudent)
        for(let i = 0; i < tempStudent.length; i++)
        {
            console.log(tempStudent[i].rollNumber)
        const tempFeeRecord = await FeeRecord.findById(tempStudent[i].feeRecord).populate('feeList');
       
        const tuitionFee = req.body.tuitionFee;
        const admissionFee = req.body.admissionFee;
        const examFee = req.body.examFee;
        const sportsFee = req.body.sportsFee;
        const otherFee = req.body.otherFee;
        const paidFee = 0;
        let totalFee = Number(tuitionFee) + Number(admissionFee) +  Number(otherFee) + Number(examFee) + Number(sportsFee) - tempFeeRecord.scholarshipAmount
        if(totalFee < 0)
        {
            totalFee = 0;
        }
        const remainingFee = totalFee;
        const newFeeDetails = new FeeDetail({
        date, totalFee, tuitionFee, sportsFee, admissionFee, examFee,  paidFee, remainingFee, otherFee
        });
        newFeeDetails.save();
    
        tempFeeRecord.feeList = tempFeeRecord.feeList || [];
        tempFeeRecord.feeList.push(newFeeDetails._id);
        tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
        tempFeeRecord.save();
    }
    res.status(201).json(tempStudent)
    return
    }
    //Some Class Selected
    if(req.body.classYear !== "All")
    {
        //All sections Selected
        if(req.body.sectionName === "All")
        {
    const date = req.body.date;
    let tempStudent = await Student.find(class_query).populate('sectionId', 'feeRecord');
    //console.log(tempStudent)
    for(let i = 0; i < tempStudent.length; i++)
    {
        console.log(tempStudent[i].rollNumber)
    const tempFeeRecord = await FeeRecord.findById(tempStudent[i].feeRecord).populate('feeList');
    const tuitionFee = req.body.tuitionFee;
        const admissionFee = req.body.admissionFee;
        const examFee = req.body.examFee;
        const sportsFee = req.body.sportsFee;
        const otherFee = req.body.otherFee;
        const paidFee = 0;
    let totalFee = Number(tuitionFee) + Number(admissionFee) +  Number(otherFee) + Number(examFee) + Number(sportsFee) - tempFeeRecord.scholarshipAmount
    if(totalFee < 0)
    {
        totalFee = 0;
    }
    const remainingFee = totalFee;
    const newFeeDetails = new FeeDetail({
    date, totalFee, tuitionFee, sportsFee, admissionFee, examFee,  paidFee, remainingFee, otherFee
    });
    newFeeDetails.save();

    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
    tempFeeRecord.save();
}
    res.status(201).json(tempStudent)
    return
    }
    //Some Section Selected
    if(req.body.sectionName !== "All")
        {
    const date = req.body.date;

    console.log(class_query)
    console.log(section_query)
    let tempStudent = await Student.find({classYear : req.body.classYear, sectionName : req.body.sectionName}).populate('sectionId', 'feeRecord');
   
    for(let i = 0; i < tempStudent.length; i++)
    {
        console.log(tempStudent[i].rollNumber)
        console.log(tempStudent[i].sectionName)
    const tempFeeRecord = await FeeRecord.findById(tempStudent[i].feeRecord).populate('feeList');
    //console.log(tempStudent)
    const tuitionFee = req.body.tuitionFee;
        const admissionFee = req.body.admissionFee;
        const examFee = req.body.examFee;
        const sportsFee = req.body.sportsFee;
        const otherFee = req.body.otherFee;
        const paidFee = 0;
        let totalFee = Number(tuitionFee) + Number(admissionFee) +  Number(otherFee) + Number(examFee) + Number(sportsFee) - tempFeeRecord.scholarshipAmount
        if(totalFee < 0)
        {
            totalFee = 0;
        }
        const remainingFee = totalFee;
        const newFeeDetails = new FeeDetail({
        date, totalFee, tuitionFee, sportsFee, admissionFee, examFee,  paidFee, remainingFee, otherFee
        });
        newFeeDetails.save();
    console.log("student saved")
    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
    tempFeeRecord.save();
    console.log("Student Saved")
}
res.status(201).json(tempStudent)
    return
    }

}

    res.status(201).json(1)
    return;
}



const getAllFeeDetailsFromStudentFeeRecord = async (req, res, next) => {
    try {
        const student_query = { rollNumber: req.params.rollNumber  };
        const tempStudent = await Student.findOne(student_query).populate('sectionId', 'feeRecord');
        console.log("here")
        FeeRecord.findById(tempStudent.feeRecord)
          .populate("feeList")
          .then((fee) => res.status(201).json(fee.feeList))
          .catch((err) => res.status(401).json("Error: " + err));
      } catch (err) {
        return next(new HttpError(err.message, 500));
      }
    };

const payFee = async (req, res, next) => {
    const id = req.body.id;
    const amount = req.body.amount;
    const filter = {rollNumber : req.body.rollNumber}
    console.log(id + " is ID " +  amount + " isAmount " + req.body.rollNumber)
    const Fee = await FeeDetail.findById(id);
    const tempStudent = await Student.findOne(filter)
    console.log(tempStudent)
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord)
    console.log(tempFeeRecord)
     Fee.paidFee = Fee.paidFee + Number(amount);

    Fee.save()
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees - Number(amount)
    Fee.remainingFee = Fee.remainingFee - Number(amount);
    tempFeeRecord.save()
    res.status(201).json(1)
    return
}
const markFeePaid = async (req, res, next) => {
    const rollNumber = req.body.rollNumber;
    const id = req.body.id;
    const filter = {rollNumber : req.body.rollNumber}
    const Fee = await FeeDetail.findById(id);
    const tempStudent = await Student.findOne(filter)
    console.log(tempStudent)
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord)
    console.log(Fee)
    console.log(tempFeeRecord)
    console.log(rollNumber)

     Fee.paidFee = Fee.totalFee;
    let temp = Fee.totalFee - Fee.remainingFee
    Fee.save()
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees - Fee.remainingFee
    Fee.remainingFee = 0;
    tempFeeRecord.save()
    res.status(201).json(1)
    return
}

const getStudentFeeRecord = async (req, res, next) => {
    const student_query = { rollNumber: req.params.rollNumber };
    const tempStudent = await Student.findOne(student_query).populate('sectionId', 'feeRecord');
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');

    res.status(201).json(tempFeeRecord);
    return;

}

const generateStudentFee = async (req, res, next) => {


        const date = req.body.date;
        studentQuery = {rollNumber : req.body.rollNumber}
        let tempStudent = await Student.findOne(studentQuery).populate('sectionId', 'feeRecord');
   

        console.log(tempStudent.rollNumber)
        const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');
        let totalFee = tempFeeRecord.totalFee;
        const tuitionFee = tempFeeRecord.tuitionFee;
        const otherFee = tempFeeRecord.otherFee;
        const paidFee = 0;
        //
        const admissionFee = 0;
        const examFee = 0;
        const sportsFee = 0;
        //
        const remainingFee = totalFee;
        const newFeeDetails = new FeeDetail({
        date, totalFee, tuitionFee, admissionFee, sportsFee, examFee, paidFee, remainingFee, otherFee
        });
        newFeeDetails.save();
    
        tempFeeRecord.feeList = tempFeeRecord.feeList || [];
        tempFeeRecord.feeList.push(newFeeDetails._id);
        tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
        tempFeeRecord.save();
    res.status(201).json(tempStudent)
    return

}

const generateNewStudentFee = async(req,res,next) => {
    const date = req.body.date;
        studentQuery = {rollNumber : req.body.rollNumber}
        let tempStudent = await Student.findOne(studentQuery).populate('sectionId', 'feeRecord');
   
        console.log(req.body.totalFee + " " + req.body.tuitionFee + " " + req.body.admissionFee + " " + req.body.examFee + " " + req.body.sportsFee)
        console.log(tempStudent.rollNumber)
        console.log("Here")
        const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');
        let totalFee = req.body.totalFee - Number(tempFeeRecord.scholarshipAmount)
        if(totalFee < 0)
        {
            totalFee = 0;
        }
        const tuitionFee = req.body.tuitionFee
    
        const admissionFee = req.body.admissionFee
        const examFee = req.body.examFee
        const sportsFee = req.body.sportsFee
        const otherFee = req.body.otherFee
        const paidFee = 0;
        const remainingFee = totalFee
        const newFeeDetails = new FeeDetail({
        date, totalFee, tuitionFee, sportsFee, examFee, admissionFee, paidFee, remainingFee, otherFee
        });
        newFeeDetails.save();
    
        tempFeeRecord.feeList = tempFeeRecord.feeList || [];
        tempFeeRecord.feeList.push(newFeeDetails._id);
        tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
        tempFeeRecord.save();
    res.status(201).json(tempStudent)
    return
}

const updateStudentFeeRecord = async (req, res, next) => {
    console.log("here")
    const securityFee = Number(req.body.securityFee);
    const tuitionFee =Number(req.body.tuitionFee);
    const scholarshipAmount = Number(req.body.scholarshipAmount);
    const otherFee = Number(req.body.otherFee);

    const tempFeeRecord = await FeeRecord.findById(req.body.id)
    tempFeeRecord.tuitionFee = tuitionFee;
    tempFeeRecord.scholarshipAmount = scholarshipAmount
    tempFeeRecord.otherFee = otherFee;
    tempFeeRecord.totalFee =  Number(tuitionFee) - Number(scholarshipAmount) + Number(otherFee)
    tempFeeRecord.save()
    console.log(tempFeeRecord)
    res.status(201).json(1)
    return


}


const generateFeeForAllStudents = async (req, res, next) => {
    const date = req.body.date ? req.body.date : null ;
    const query = {rollNumber : req.body.rollNumber}
    const allStudents = await Student.findOne(query).populate("sectionId", "feeRecord")
        const tempFeeRecord = await FeeRecord.findById(allStudents.feeRecord).populate('feeList')
        let totalFee = tempFeeRecord.totalFee
        const tuitionFee = tempFeeRecord.tuitionFee;
        const fineFee = 0;
        const otherFee = tempFeeRecord.otherFee;
        const paidFee = 0;
        const remainingFee = totalFee;

        const newFeeDetails = new FeeDetail({

             totalFee, tuitionFee, fineFee,  paidFee, remainingFee,otherFee
        });
        newFeeDetails.save();
        tempFeeRecord.feeList = tempFeeRecord.feeList || [];
        tempFeeRecord.feeList.push(newFeeDetails._id);
        tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
        tempFeeRecord.save();
       
    res.status(201).json(tempFeeRecord)
}

const deleteAllFeeRecord = async(req,res,next) => {
    let result = await FeeRecord.find().populate('feeList');
    if(result.length != null)
    {
        console.log("LOL")
    }
    for(let i=0;i< result.length; i++)
    {
        console.log(i)
        let feeListResult = await FeeDetail.find();
            for(let j=0;j<feeListResult.length;j++)
            {
                const check = await FeeDetail.findByIdAndDelete(feeListResult[j]._id)
            }
        const delcheck = await FeeRecord.findByIdAndDelete(result[i]._id)
    }
    res.status(201)
    return;
}

const generateFeeForListOfStudents = async(req,res,next) => {
    const class_query = {classYear : req.body.classYear}
    const section_query = {sectionName : req.body.sectionName}
    console.log(req.body.classYear)
    console.log(req.body.sectionName)
    // All Classes Selected
    if(req.body.classYear === "All")
    {
        const date = req.body.date;
        let tempStudent = await Student.find().populate('sectionId', 'feeRecord');
        //console.log(tempStudent)
        for(let i = 0; i < tempStudent.length; i++)
        {
            console.log(tempStudent[i].rollNumber)
        const tempFeeRecord = await FeeRecord.findById(tempStudent[i].feeRecord).populate('feeList');
        let totalFee = tempFeeRecord.totalFee;
        const tuitionFee = tempFeeRecord.tuitionFee;
        const sportsFee = 0;
        const examFee = 0;
        const admissionFee = 0;
        const otherFee = tempFeeRecord.otherFee;
        const paidFee = 0;
        const remainingFee = totalFee;
        const newFeeDetails = new FeeDetail({
        date, totalFee, tuitionFee, sportsFee, admissionFee, examFee,  paidFee, remainingFee, otherFee
        });
        newFeeDetails.save();
    
        tempFeeRecord.feeList = tempFeeRecord.feeList || [];
        tempFeeRecord.feeList.push(newFeeDetails._id);
        tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
        tempFeeRecord.save();
    }
    res.status(201).json(tempStudent)
    return
    }
    //Some Class Selected
    if(req.body.classYear !== "All")
    {
        //All sections Selected
        if(req.body.sectionName === "All")
        {
    const date = req.body.date;
    let tempStudent = await Student.find(class_query).populate('sectionId', 'feeRecord');
    //console.log(tempStudent)
    for(let i = 0; i < tempStudent.length; i++)
    {
        console.log(tempStudent[i].rollNumber)
    const tempFeeRecord = await FeeRecord.findById(tempStudent[i].feeRecord).populate('feeList');
    let totalFee = tempFeeRecord.totalFee;
    const tuitionFee = tempFeeRecord.tuitionFee;
    const sportsFee = 0;
    const examFee = 0;
    const admissionFee = 0;
    const otherFee = tempFeeRecord.otherFee;
    const paidFee = 0;
    const remainingFee = totalFee;
    const newFeeDetails = new FeeDetail({
        date, totalFee, tuitionFee, admissionFee, examFee, sportsFee,  paidFee, remainingFee, otherFee
    });
    newFeeDetails.save();

    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
    tempFeeRecord.save();
}
    res.status(201).json(tempStudent)
    return
    }
    //Some Section Selected
    if(req.body.sectionName !== "All")
        {
    const date = req.body.date;

    console.log(class_query)
    console.log(section_query)
    let tempStudent = await Student.find({classYear : req.body.classYear, sectionName : req.body.sectionName}).populate('sectionId', 'feeRecord');
   
    for(let i = 0; i < tempStudent.length; i++)
    {
        console.log(tempStudent[i].rollNumber)
        console.log(tempStudent[i].sectionName)
    const tempFeeRecord = await FeeRecord.findById(tempStudent[i].feeRecord).populate('feeList');
    //console.log(tempStudent)
    let totalFee = tempFeeRecord.totalFee;
        const tuitionFee = tempFeeRecord.tuitionFee;
        const sportsFee = 0;
        const examFee = 0;
        const admissionFee = 0;
        const otherFee = tempFeeRecord.otherFee;
        const paidFee = 0;
        const remainingFee = totalFee;
    const newFeeDetails = new FeeDetail({
    date, totalFee, tuitionFee, admissionFee, examFee, sportsFee,  paidFee, remainingFee, otherFee
    });
    newFeeDetails.save();

    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
    tempFeeRecord.save();
}
res.status(201).json(tempStudent)
    return
    }

}

    res.status(201).json(1)
    return;


}

const deleteFeeDetails = async(req,res,next) => {
    const tempFee = await FeeDetail.findById(req.body.id)
    const filter = {rollNumber : req.body.rollNumber}
    const tempStudent = await Student.findOne(filter)
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord)
    console.log(tempStudent)
    console.log("In the Function")
    console.log(tempFee)
    console.log(tempFeeRecord)
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees - tempFee.remainingFee;
    tempFeeRecord.save();
    const check = await FeeDetail.findByIdAndDelete(tempFee._id)
    res.status(201).json(1)
    return
}

const getCommulativeFeeChallan = async(req,res,next) => {
    console.log("Hahaha")
    console.log(req.params.rollNumber)
 
    const rollNumber = { rollNumber: req.params.rollNumber };
    const TempStudent = await Student.findOne(rollNumber)
    const TempFeeRecord = await FeeRecord.findById(TempStudent.feeRecord._id).populate('feeList')
    let tempFee;
    for(let i=0;i < TempFeeRecord.feeList.length ; i++)
    {
        console.log(TempFeeRecord.feeList[i].createdAt)
        if(TempFeeRecord.feeList[i] < TempFeeRecord.feeList[i+1])
        {
            tempFee = TempFeeRecord.feeList[i+1]
        }
        console.log(i)
    }
    res.status(201).json(tempFee)
}

exports.getCommulativeFeeChallan = getCommulativeFeeChallan;
exports.deleteFeeDetails = deleteFeeDetails
exports.getStudentFeeRecord = getStudentFeeRecord;
exports.markFeePaid = markFeePaid;
exports.payFee = payFee;
exports.getAllFeeDetailsFromStudentFeeRecord = getAllFeeDetailsFromStudentFeeRecord;
exports.addFeeDetailToStudentFeeRecord = addFeeDetailToStudentFeeRecord;
exports.generateStudentFee = generateStudentFee;
exports.updateStudentFeeRecord = updateStudentFeeRecord;
exports.generateFeeForAllStudents = generateFeeForAllStudents;
exports.deleteAllFeeRecords = deleteAllFeeRecord;
exports.generateNewStudentFee = generateNewStudentFee
exports.generateFeeForListOfStudents = generateFeeForListOfStudents;