const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const usersController = require('../controllers/users-controller');
//order of midleware matters for the paths

router.get('/', usersController.getUsers);

// we only need to validate the signup route 
router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 5})
] ,  usersController.signup)

router.post('/login', usersController.login)


module.exports  = router;