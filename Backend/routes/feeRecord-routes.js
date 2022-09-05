const express = require('express');
const router = express.Router();

const FeeRecordController = require('../controllers/feeRecord-controller');

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
router.patch('/updateStudentFeeRecord', FeeRecordController.updateStudentFeeRecord);

router.get('/getAllFeeDetailsFromStudentFeeRecord', FeeRecordController.getAllFeeDetailsFromStudentFeeRecord);
/*
{
    "rollNumber" : 6000
}
*/
module.exports = router;