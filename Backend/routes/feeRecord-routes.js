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
router.get('/getStudentFeeRecord', FeeRecordController.getStudentFeeRecord)
/*
{
    "rollNumber" : 66 
}
*/
router.post('/addFeeDetailToStudentFeeRecord', FeeRecordController.addFeeDetailToStudentFeeRecord);
/*
{
    //FEE DETAILS
    "feeMonth": "A",
    "totalFee" : 30,
    "tuitionFee": 1,
    "fineFee": 1,
    "securityFee": 1,
    "paidFee": 1,
    "remainingFee": 1,
    //ROLL NUMBER OF STUDENT
    "rollNumber" : 6000 OF STUDENT
}
*/

router.get('/getAllFeeDetailsFromStudentFeeRecord', FeeRecordController.getAllFeeDetailsFromStudentFeeRecord);
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
router.patch('/updateStudentFeeRecord', FeeRecordController.updateStudentFeeRecord)
/*
{
    "securityFee": 5
    "tutionFee": 5
    "scholarshipAmount": 5
    "rollNumber": 66
}

*/
module.exports = router;