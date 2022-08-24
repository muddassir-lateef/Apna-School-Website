const express = require('express');
const router = express.Router();
const LectureController = require('../controllers/lecture-controller');

router.get('/', LectureController.getAllLectures);

router.post('/addNew', LectureController.createNewLecture);


module.exports = router