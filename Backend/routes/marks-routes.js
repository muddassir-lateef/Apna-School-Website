const express = require('express');
const router = express.Router();
const MarksController = require('../controllers/marks-controller');

router.get('/', MarksController.getAllMarks);

router.get('/:marksId', MarksController.getMarksById);

module.exports = router