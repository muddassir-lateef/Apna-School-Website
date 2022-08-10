const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Shayan Amir",
    email: 'shayanamir98@gmail.com',
    password: 'pass123'
  },
  {
    id: "u2",
    name: "Asad",
    email: 'asadafzal@gmail.com',
    password: 'mypass'
  }
];

const getUsers = (req, res, next) => {
    res.status(200).json({
        users: DUMMY_USERS,
        meessage: 'All users sent'
    });
}

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs for signup passed', 422);
    }

    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(user => user.email === email);
    if (hasUser){
        throw new HttpError('Could not create user, User already exists', 422);
    }
    const createdUser = {
        id: uuid.v4(),
        name, //name: name
        email, 
        password
    }

    DUMMY_USERS.push(createdUser);
    res.status(201).json({
        newUser: createdUser,
        message: 'New user was created'
    });

}

const login = (req, res, next) => {
    const {email, password} = req.body
    const tempUser = DUMMY_USERS.find(user => user.email === email);
    if (tempUser && tempUser.password === password){
        res.json({
            user: tempUser,
            message: 'Login sccessful'
        })
    }
    else{
        throw new HttpError('Invalid login credentials', 401);
    }
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;