const express = require('express');
const router = express.Router();

const certificateController = require('../controllers/certificate-controller');



//get a admin by username
router.get('/generate/:name', certificateController.genCert)


module.exports = router;
