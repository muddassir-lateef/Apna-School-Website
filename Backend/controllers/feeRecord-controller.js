const HttpError = require('../models/http-error');
let Student = require('../models/student.model');
let FeeRecord = require('../models/feeRecord.model');
let FeeDetail = require('../models/feeDetails.model');



const addFeeDetailToStudentFeeRecord = async (req, res, next) => {
    //Creating new FeeDetail object by Body
    const feeYear = req.body.feeYear;
    const feeMonth = req.body.feeMonth;
    let totalFee = req.body.totalFee ? req.body.totalFee : 0;
    const tuitionFee = req.body.tuitionFee;
    const fineFee = req.body.fineFee;
    const securityFee = req.body.securityFee;
    const paidFee = 0;
    const otherFee = req.body.otherFee;
    totalFee = tuitionFee + fineFee + securityFee + otherFee ;
    let remainingFee = totalFee;
    let feeID = String(req.body.rollNumber)
    console.log(feeID)
    feeID = feeID + String(Math.floor(Math.random()*100000))
    console.log(feeID)
    const newFeeDetails = new FeeDetail({

        feeYear, feeMonth, totalFee, tuitionFee, fineFee, securityFee, paidFee, remainingFee, otherFee

    });
    newFeeDetails.save();

    const student_query = { rollNumber: req.body.rollNumber };
    const tempStudent = await Student.findOne(student_query).populate('sectionId', 'feeRecord');
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;

    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.save()
        .then(() => res.json({ message: "FeeRecord has been updated with new Fee", FeeRecord: tempFeeRecord }))
        .catch((err) => res.status(400).json("Error: " + err));

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
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord);

    res.status(201).json(tempFeeRecord);
    return;

}

const generateStudentFee = async (req, res, next) => {

    const feeYear = req.body.feeYear;
    const feeMonth = req.body.feeMonth;

    const student_query = { rollNumber: req.body.rollNumber };
    const tempStudent = await Student.findOne(student_query).populate('sectionId', 'feeRecord');

    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');

    let totalFee = tempFeeRecord.totalFee - tempFeeRecord.scholarshipAmount;
    const tuitionFee = tempFeeRecord.tuitionFee;
    const fineFee = 0;
    const securityFee = tempFeeRecord.securityFee;
    const otherFee = tempFeeRecord.otherFee;
    const paidFee = 0;
    const remainingFee = totalFee;


    const newFeeDetails = new FeeDetail({

        feeYear, feeMonth, totalFee, tuitionFee, fineFee, securityFee, paidFee, remainingFee, otherFee
    });
    newFeeDetails.save();

    tempFeeRecord.feeList = tempFeeRecord.feeList || [];
    tempFeeRecord.feeList.push(newFeeDetails._id);
    tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
    tempFeeRecord.save();
    res.status(201).json(newFeeDetails)
    return;

}

const updateStudentFeeRecord = async (req, res, next) => {
    console.log("here")
    const securityFee = Number(req.body.securityFee);
    const tuitionFee =Number(req.body.tuitionFee);
    const scholarshipAmount = Number(req.body.scholarshipAmount);
    const otherFee = Number(req.body.otherFee);

    const tempFeeRecord = await FeeRecord.findById(req.body.id)
    tempFeeRecord.securityFee = securityFee;
    tempFeeRecord.tuitionFee = tuitionFee;
    tempFeeRecord.scholarshipAmount = scholarshipAmount
    tempFeeRecord.otherFee = otherFee;
    tempFeeRecord.totalFee = Number(securityFee) + Number(tuitionFee) - Number(scholarshipAmount) + Number(otherFee)
    tempFeeRecord.save()
    console.log(tempFeeRecord)
    res.status(201).json(1)
    return


}


const generateFeeForAllStudents = async (req, res, next) => {
    const feeYear = req.body.feeYear;
    const feeMonth = req.body.feeMonth;

    const allStudents = await Student.find().populate("sectionId", "feeRecord")
    for (let i = 0; i < allStudents.length; i++) {
        const tempFeeRecord = await FeeRecord.findById(allStudents[i].feeRecord).populate('feeList')
        let totalFee = tempFeeRecord.totalFee - tempFeeRecord.scholarshipAmount;
        const tuitionFee = tempFeeRecord.tuitionFee;
        const fineFee = 0;
        const securityFee = tempFeeRecord.securityFee;
        const otherFee = tempFeeRecord.otherFee;
        const paidFee = 0;
        const remainingFee = totalFee;

        const newFeeDetails = new FeeDetail({

            feeYear, feeMonth, totalFee, tuitionFee, fineFee, securityFee, paidFee, remainingFee,otherFee
        });
        newFeeDetails.save();
        tempFeeRecord.feeList = tempFeeRecord.feeList || [];
        tempFeeRecord.feeList.push(newFeeDetails._id);
        tempFeeRecord.outStandingFees = tempFeeRecord.outStandingFees + totalFee;
        tempFeeRecord.save();
        
    }
    res.status(201).json(feeYear)
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
        const fineFee = 0;
        const securityFee = tempFeeRecord.securityFee;
        const otherFee = tempFeeRecord.otherFee;
        const paidFee = 0;
        const remainingFee = totalFee;
        const newFeeDetails = new FeeDetail({
        date, totalFee, tuitionFee, fineFee, securityFee, paidFee, remainingFee, otherFee
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
    const fineFee = 0;
    const securityFee = tempFeeRecord.securityFee;
    const otherFee = tempFeeRecord.otherFee;
    const paidFee = 0;
    const remainingFee = totalFee;
    const newFeeDetails = new FeeDetail({
    date, totalFee, tuitionFee, fineFee, securityFee, paidFee, remainingFee, otherFee
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
    const fineFee = 0;
    const securityFee = tempFeeRecord.securityFee;
    const otherFee = tempFeeRecord.otherFee;
    const paidFee = 0;
    const remainingFee = totalFee;
    const newFeeDetails = new FeeDetail({
    date, totalFee, tuitionFee, fineFee, securityFee, paidFee, remainingFee, otherFee
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
exports.generateFeeForListOfStudents = generateFeeForListOfStudents;