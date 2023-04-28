var express = require('express');
var router = express.Router();
// var jwt = require('express-jwt');
// var auth = jwt({
//   secret: 'MY_SECRET',
//   userProperty: 'payload'
// });


var Auth = require('../controllers/authentication');

// profile
// router.get('/dashboard', auth, Profile.profileRead);

// authentication
router.post('/register', Auth.register);
router.post('/login', Auth.login);
//router.get('/logout',Auth.logout)

module.exports = router;