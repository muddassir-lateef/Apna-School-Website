const router = require('express').Router();
let Login = require('../models/login.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  Login.find()
    .populate("userid")
    .then(login => res.json(login))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/signup').post((req, res) => {
  const username = req.body.username;
  const type = req.body.type;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const newUser = new User({username,type,firstName,lastName});
  newUser.save()
  .then(() => {
    const newLogin =new Login({username,password,userid:newUser._id});
    newLogin.save()
    .then(() => {
      res.json('Login added!');
      })
    .catch(err => res.status(400).json('Error: ' + err));
  
    })
  .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/login').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({username,type,firstName,lastName});
  newUser.save()
  .then(() => {
    const newLogin =new Login({username,password,userid:newUser._id});
    newLogin.save()
    .then(() => {
      res.json('Login added!');
      })
    .catch(err => res.status(400).json('Error: ' + err));
  
    })
  .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;