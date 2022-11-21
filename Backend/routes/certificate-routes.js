const express = require('express');
const router = express.Router();

const certificateController = require('../controllers/certificate-controller');



//get a admin by username
router.get('/generate/:name', certificateController.genCert)

router.patch('/getResult/:rollNumber', certificateController.genResult)


module.exports = router;
