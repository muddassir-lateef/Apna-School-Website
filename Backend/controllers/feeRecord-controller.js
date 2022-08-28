const HttpError = require('../models/http-error');
let Student = require('../models/student.model');
let FeeRecord = require('../models/feeRecord.model');
let FeeDetail = require('../models/feeDetails.model');



const addFeeDetailToStudentFeeRecord = async(req,res,next) => {
    //Creating new FeeDetail object by Body
    const feeMonth = req.body.feeMonth;
    const totalFee = req.body.totalFee;
    const tuitionFee = req.body.tuitionFee;
    const fineFee = req.body.fineFee;
    const securityFee = req.body.securityFee;
    const paidFee = req.body.paidFee;
    const remainingFee = req.body.remainingFee;
    const newFeeDetails= new FeeDetail({

        feeMonth,totalFee,tuitionFee,fineFee,securityFee,paidFee,remainingFee

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

  const updateStudentFeeRecord = async(req,res,next) =>
  {
    const feeMonth = req.body.feeMonth;
    const totalFee = req.body.totalFee;
    const tuitionFee = req.body.tuitionFee;
    const fineFee = req.body.fineFee;
    const securityFee = req.body.securityFee;
    const paidFee = req.body.paidFee;
    const remainingFee = req.body.remainingFee;
    const newFeeDetails= new FeeDetail({

        feeMonth,totalFee,tuitionFee,fineFee,securityFee,paidFee,remainingFee

                                 });
    newFeeDetails.save();

    const student_query = {rollNumber : req.body.rollNumber};
    const tempStudent = await Student.findOne(student_query).populate('sectionId','feeRecord');
    const tempFeeRecord = await FeeRecord.findById(tempStudent.feeRecord).populate('feeList');
    for(let i=0; i< tempFeeRecord.feeList.length; i++ )
    {
        tempFee = await FeeDetail.findById(tempFeeRecord.feeList[i]);
        if(tempFee.feeMonth == feeMonth)
        {
            tempFee.feeMonth = feeMonth;
            tempFee.totalFee = totalFee;
            tempFee.fineFee = fineFee;
            tempFee.paidFee = paidFee;
            tempFee.remainingFee = remainingFee;
            tempFee.tuitionFee = tuitionFee;
            tempFee.securityFee = securityFee;
            tempFee.save()
            .then(() => res.json({message: "Student Fee Updates!" ,FeeDetail : tempFee}))
            .catch((err) => res.status(400).json("Error : " + err));

            return;
        }
    }

    return next(new HttpError("Could not find particual Fee", 409));
    
}
  exports.updateStudentFeeRecord = updateStudentFeeRecord;
  exports.addFeeDetailToStudentFeeRecord = addFeeDetailToStudentFeeRecord;