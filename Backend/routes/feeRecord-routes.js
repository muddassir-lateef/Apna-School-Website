const express = require('express');
const router = express.Router();

const FeeRecordController = require('../controllers/feeRecord-controller');
router.patch('/payFee', FeeRecordController.payFee)

/*
{
 "feeMonth" : 1,
  "feeYear" : 2022,
"paidAmount" : 10,
"rollNumber" :1
}
*/
router.patch('/markFeePaid', FeeRecordController.markFeePaid)
/*
{
    "feeMonth" : 1,
    "feeYear" : 2,
    "rollNumber" : 3
}
*/
router.post('/generateFeeForAllStudents', FeeRecordController.generateFeeForAllStudents)
/*
{
    "feeMonth" : 2,
    "feeYear" : 4
}
*/
router.get('/getStudentFeeRecord/:rollNumber', FeeRecordController.getStudentFeeRecord)
/*
{
    "rollNumber" : 66 
}
*/
router.post('/addFeeDetailToStudentFeeRecord', FeeRecordController.addFeeDetailToStudentFeeRecord);
/*
{
    "feeMonth": 1,
    "feeYear" : 2,
    "tuitionFee": 1,
    "fineFee": 1,
    "securityFee": 1,
    "otherFee" : 20,
    "rollNumber" : 4664
}
*/

router.get('/getAllFeeDetailsFromStudentFeeRecord/:rollNumber', FeeRecordController.getAllFeeDetailsFromStudentFeeRecord);
/*
{
    "rollNumber" : 6000
}
*/


router.post('/generateStudentFee', FeeRecordController.generateStudentFee)
/*
    "feeMonth" : 1,
    "feeYear" : 2,
    "rollNumber" : 3
*/
router.delete('/deleteAllFeeRecord', FeeRecordController.deleteAllFeeRecords);
/*
NO BODY
FOR CLEARING DATABASE
*/
router.patch('/updateStudentFeeRecord', FeeRecordController.updateStudentFeeRecord)
/*
{
    "securityFee": 5
    "tutionFee": 5
    "scholarshipAmount": 5
    "rollNumber": 66
}
*/
router.post('/generateFeeForListOfStudents', FeeRecordController.generateFeeForListOfStudents);
module.exports = router;